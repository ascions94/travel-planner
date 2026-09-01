function getPeriodFromTime(time) {
    const hour = parseInt(time.split(":")[0]);

    if (hour < 12) {
        return "morning";
    }

    if (hour < 18) {
        return "afternoon";
    }

    return "evening";
}
function countActivitiesByPeriod(day) {
    return {
        morning: day.filter(
            activity => getPeriodFromTime(activity.time) === "morning"
        ).length,

        afternoon: day.filter(
            activity => getPeriodFromTime(activity.time) === "afternoon"
        ).length,

        evening: day.filter(
            activity => getPeriodFromTime(activity.time) === "evening"
        ).length
    };
}

function getMinutesFromTime(time) {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
}

function getTimeFromMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function formatDuration(minutes) {
    if (!minutes) {
        return "";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
        return `${remainingMinutes} min`;
    }

    if (remainingMinutes === 0) {
        return `${hours}h`;
    }

    return `${hours}h ${remainingMinutes} min`;
}

function calculateDynamicStartTime(day, activity, nearbyZones) {
    // Se è la prima attività del giorno,
    // manteniamo per ora il suo orario originale
    if (day.length === 0) {
        return activity.time;
    }

    // Ordiniamo le attività già presenti per orario
    const sortedDay = [...day].sort(
        (a, b) =>
            getMinutesFromTime(a.time) -
            getMinutesFromTime(b.time)
    );

    // Prendiamo l'ultima attività della giornata
    const lastActivity = sortedDay[sortedDay.length - 1];

    // Calcoliamo quando possiamo iniziare la successiva
    const nextAvailableMinutes = getNextAvailableTime(
        lastActivity,
        activity,
        nearbyZones
    );

    return getTimeFromMinutes(nextAvailableMinutes);
}

function getActivityEndTime(activity) {
    const startMinutes = getMinutesFromTime(activity.time);
    const duration = activity.duration || 60;

    return startMinutes + duration;
}

function getNextAvailableTime(activity, nextActivity, nearbyZones) {
    const activityEnd = getActivityEndTime(activity);

    const travelTime = getTravelTime(
        activity,
        nextActivity,
        nearbyZones
    );

    return activityEnd + travelTime;
}

function getTravelTime(activityA, activityB, nearbyZones) {

    if (activityA.area === activityB.area) {
        return 15;
    }

    if (activityA.zone === activityB.zone) {
        return 30;
    }

    const areNearby =
        (nearbyZones[activityA.zone] || []).includes(activityB.zone) ||
        (nearbyZones[activityB.zone] || []).includes(activityA.zone);

    if (areNearby) {
        return 45;
    }

    return 75;
}
function getDayTotalMinutes(day, nearbyZones = {}) {
    if (day.length === 0) {
        return 0;
    }

    const sortedDay = [...day].sort(
        (a, b) =>
            getMinutesFromTime(a.time) -
            getMinutesFromTime(b.time)
    );

    let totalMinutes = 0;

    sortedDay.forEach((activity, index) => {
        totalMinutes += activity.duration || 60;

        const nextActivity = sortedDay[index + 1];

        if (nextActivity) {
            totalMinutes += getTravelTime(
                activity,
                nextActivity,
                nearbyZones
            );
        }
    });

    return totalMinutes;
}
function hasTimeConflict(day, activity, nearbyZones = {}) {
    const activityStart = getMinutesFromTime(activity.time);
    const activityEnd = getActivityEndTime(activity);

    // Pausa pranzo: 12:30 - 14:00
    const lunchStart = 12 * 60 + 30;
    const lunchEnd = 14 * 60;

    const overlapsLunch =
        activityStart < lunchEnd &&
        activityEnd > lunchStart;

    if (overlapsLunch) {
        return true;
    }

    return day.some(existingActivity => {
    const existingStart = getMinutesFromTime(existingActivity.time);

    // La nuova attività viene dopo quella esistente
    if (activityStart >= existingStart) {
        const nextAvailableTime = getNextAvailableTime(
            existingActivity,
            activity,
            nearbyZones
        );

        return activityStart < nextAvailableTime;
    }

    // La nuova attività viene prima di quella esistente
    const nextAvailableTime = getNextAvailableTime(
        activity,
        existingActivity,
        nearbyZones
    );

    return existingStart < nextAvailableTime;
});
}

function getMinimumTimeDistance(day, activity) {
    if (day.length === 0) {
        return Infinity;
    }

    const activityMinutes = getMinutesFromTime(activity.time);

    const distances = day.map(existingActivity => {
        const existingMinutes = getMinutesFromTime(existingActivity.time);

        return Math.abs(activityMinutes - existingMinutes);
    });

    return Math.min(...distances);
}
const button = document.getElementById("create-trip");
const destinationSelect = document.getElementById("destination");

Object.keys(destinations).forEach(cityKey => {
    const option = document.createElement("option");

    option.value = cityKey;

    option.textContent =
    `${destinations[cityKey].name} — ${destinations[cityKey].country}`;

    destinationSelect.appendChild(option);
});

button.addEventListener("click", function () {

    const destination = document.getElementById("destination").value;
    const startDate = document.getElementById("start-date").value;
    const days = document.getElementById("days").value;

    const result = document.getElementById("trip-result");

    // Controllo campi vuoti
    if (destination === "" || startDate === "" || days === "") {
        alert("Compila tutti i campi prima di creare l'itinerario.");
        return;
    }

    // Controllo numero di giorni
    if (days < 1 || days > 30) {
        alert("Il numero di giorni deve essere compreso tra 1 e 30.");
        return;
    }

    const cityKey = destination.toLowerCase();
const cityData = destinations[cityKey];

let daysHtml = "";

for (let i = 1; i <= days; i++) {
        const currentDate = new Date(startDate + "T00:00:00");

currentDate.setDate(
    currentDate.getDate() + (i - 1)
);

const formattedDate = currentDate.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long"
});
const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
const cityActivities = cityData?.activities || [];
const nearbyZones = cityData?.nearbyZones || {};
const dayGroups = cityData?.dayGroups || [];

const maxActivitiesPerDay = 8;
const maxActivities = days * maxActivitiesPerDay;
const maxDayMinutes = 540;

let selectedActivities = [];
let activitiesByDay = [];

if (days == 1) {
    const zones = {};

    cityActivities.forEach(activity => {
        const zoneName = activity.zone || "Senza zona";

        if (!zones[zoneName]) {
            zones[zoneName] = [];
        }

        zones[zoneName].push(activity);
    });

    const zoneNames = Object.keys(zones);

    zoneNames.sort((zoneA, zoneB) => {
        const scoreA = zones[zoneA].reduce(
            (total, activity) => total + (activity.priority || 0),
            0
        );

        const scoreB = zones[zoneB].reduce(
            (total, activity) => total + (activity.priority || 0),
            0
        );

        return scoreB - scoreA;
    });

    const bestZone = zoneNames[0];

    selectedActivities = [...zones[bestZone]]
        .sort((a, b) => (b.priority || 0) - (a.priority || 0))
        .slice(0, maxActivities);

} else {
    const zones = {};

    cityActivities.forEach(activity => {
        const zoneName = activity.zone || "Senza zona";

        if (!zones[zoneName]) {
            zones[zoneName] = [];
        }

        zones[zoneName].push(activity);
    });

    const zoneNames = Object.keys(zones);

    zoneNames.sort((zoneA, zoneB) => {
        const scoreA = zones[zoneA].reduce(
            (total, activity) => total + (activity.priority || 0),
            0
        );

        const scoreB = zones[zoneB].reduce(
            (total, activity) => total + (activity.priority || 0),
            0
        );

        return scoreB - scoreA;
    });

    activitiesByDay = Array.from(
    { length: Number(days) },
    () => []
);

if (dayGroups.length > 0) {
    activitiesByDay = dayGroups
        .slice(0, Number(days))
        .map(group => {
            const groupActivities = cityActivities.filter(activity =>
                group.zones.includes(activity.zone)
            );

            const sortedActivities = [...groupActivities]
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));

const selectedGroupActivities = [];

while (selectedGroupActivities.length < maxActivitiesPerDay) {

    const availableActivities = sortedActivities.filter(activity =>
        !selectedGroupActivities.includes(activity) &&
        !hasTimeConflict(selectedGroupActivities, activity, nearbyZones)
    );

    if (availableActivities.length === 0) {
        break;
    }

    const periodCounts =
        countActivitiesByPeriod(selectedGroupActivities);

    availableActivities.sort((a, b) => {

    const periodA = getPeriodFromTime(a.time);
    const periodB = getPeriodFromTime(b.time);

    const countA = periodCounts[periodA];
    const countB = periodCounts[periodB];

    const scoreA =
        (a.priority || 0) * 10
        - countA * 6;

    const scoreB =
        (b.priority || 0) * 10
        - countB * 6;

    return scoreB - scoreA;
});

    selectedGroupActivities.push(availableActivities[0]);
}

return selectedGroupActivities;
        });

        const usedActivityNames = new Set(
    activitiesByDay
        .flat()
        .map(activity => activity.name)
);

activitiesByDay.forEach(day => {

    while (day.length < maxActivitiesPerDay) {

        const periodCounts = countActivitiesByPeriod(day);
        const zonesInDay = [
            ...new Set(
                day.map(activity => activity.zone).filter(Boolean)
            )
        ];

        const unusedActivities = cityActivities.filter(activity => {
    if (usedActivityNames.has(activity.name)) {
        return false;
    }

    if (hasTimeConflict(day, activity, nearbyZones)) {
        return false;
    }

    const testDay = [
        ...day,
        activity
    ];

    return getDayTotalMinutes(testDay, nearbyZones) <= maxDayMinutes;
});

const nearbyCandidates = unusedActivities.filter(activity => {
    if (zonesInDay.length === 0) {
        return true;
    }

    return zonesInDay.some(zone =>
        zone === activity.zone ||
        (nearbyZones[zone] || []).includes(activity.zone) ||
        (nearbyZones[activity.zone] || []).includes(zone)
    );
});

const candidates =
    (nearbyCandidates.length > 0
        ? nearbyCandidates
        : unusedActivities
    )
    .sort((a, b) => {

                const aCompatible = zonesInDay.some(zone =>
                    zone === a.zone ||
                    (nearbyZones[zone] || []).includes(a.zone) ||
                    (nearbyZones[a.zone] || []).includes(zone)
                );

                const bCompatible = zonesInDay.some(zone =>
                    zone === b.zone ||
                    (nearbyZones[zone] || []).includes(b.zone) ||
                    (nearbyZones[b.zone] || []).includes(zone)
                );

                if (aCompatible !== bCompatible) {
                    return Number(bCompatible) - Number(aCompatible);
                }

                const periodA = getPeriodFromTime(a.time);
const periodB = getPeriodFromTime(b.time);

const countA = periodCounts[periodA];
const countB = periodCounts[periodB];

if (countA !== countB) {
    return countA - countB;
}

const distanceA = getMinimumTimeDistance(day, a);
const distanceB = getMinimumTimeDistance(day, b);

if (distanceA !== distanceB) {
    return distanceB - distanceA;
}

return (b.priority || 0) - (a.priority || 0);
            });

        const nextActivity = candidates[0];

if (!nextActivity) {
    break;
}

// Creiamo una copia per non modificare i dati originali
const scheduledActivity = {
    ...nextActivity
};

// Calcoliamo il primo orario possibile
const dynamicTime = calculateDynamicStartTime(
    day,
    scheduledActivity,
    nearbyZones
);

const originalMinutes =
    getMinutesFromTime(scheduledActivity.time);

const dynamicMinutes =
    getMinutesFromTime(dynamicTime);

// Non anticipiamo mai l'orario originale.
// Possiamo soltanto mantenerlo o spostarlo più avanti.
let finalStartMinutes = Math.max(
    originalMinutes,
    dynamicMinutes
);

// Pausa pranzo 12:30 - 14:00
const lunchStart = 12 * 60 + 30;
const lunchEnd = 14 * 60;

const activityDuration =
    scheduledActivity.duration || 60;

const overlapsLunch =
    finalStartMinutes < lunchEnd &&
    finalStartMinutes + activityDuration > lunchStart;

if (overlapsLunch) {
    finalStartMinutes = lunchEnd;
}

// Assegniamo il nuovo orario calcolato
scheduledActivity.time =
    getTimeFromMinutes(finalStartMinutes);

day.push(scheduledActivity);
usedActivityNames.add(scheduledActivity.name);
    }
});

} else {
zoneNames.forEach(zoneName => {
    const zoneActivities = [...zones[zoneName]]
        .sort((a, b) => (b.priority || 0) - (a.priority || 0));

    zoneActivities.forEach(activity => {

    const compatibleDay = activitiesByDay.find(day => {

        if (day.length === 0 || day.length >= maxActivitiesPerDay) {
            return false;
        }

        const zonesInDay = [
            ...new Set(day.map(item => item.zone).filter(Boolean))
        ];

        return zonesInDay.some(dayZone => {

            if (dayZone === activity.zone) {
                return true;
            }

            const nearbyFromDay = nearbyZones[dayZone] || [];
            const nearbyFromActivity = nearbyZones[activity.zone] || [];

            return (
                nearbyFromDay.includes(activity.zone) ||
                nearbyFromActivity.includes(dayZone)
            );
        });
    });

    const emptyDay = activitiesByDay.find(
        day => day.length === 0
    );

    const availableDay = activitiesByDay.find(
        day => day.length < maxActivitiesPerDay
    );

    const targetDay =
        compatibleDay || emptyDay || availableDay;

    if (targetDay) {
        targetDay.push(activity);
    }
});
});
}

// Ordina le attività di ogni giorno per orario
activitiesByDay.forEach(day => {
    day.sort((a, b) => a.time.localeCompare(b.time));
});

selectedActivities = activitiesByDay.flat();
}

let dayActivities = [];

if (days == 1) {
    dayActivities = selectedActivities;
} else {
    dayActivities = activitiesByDay[i - 1] || [];
}
const dayZones = [
    ...new Set(
        dayActivities
            .map(activity => activity.zone)
            .filter(Boolean)
    )
];

const mainZone =
    dayZones.length > 0
        ? dayZones.join(" · ")
        : "";
const morningActivities = dayActivities.filter(
    activity => getPeriodFromTime(activity.time) === "morning"
);

const afternoonActivities = dayActivities.filter(
    activity => getPeriodFromTime(activity.time) === "afternoon"
);

const eveningActivities = dayActivities.filter(
    activity => getPeriodFromTime(activity.time) === "evening"
);
        daysHtml += `
    <div class="day-card">
        <h3>
    Giorno ${i} — ${capitalizedDate}
</h3>
${mainZone ? `<p class="day-zone">📍 ${mainZone}</p>` : ""}

        <div class="activities" id="activities-${i}">

        ${
    morningActivities.length > 0
        ? `
            <div class="period-section" data-period="morning">
                <h4>☀️ Mattina</h4>

                ${morningActivities.map(activity => `
                    <div class="activity-item">
                        <span class="activity-text">
                            ⏰ ${activity.time} —
${activity.priority === 3 ? "⭐⭐⭐ " :
activity.priority === 2 ? "⭐⭐ " :
activity.priority === 1 ? "⭐ " : ""}
📍 ${activity.name}
${activity.area ? ` — 🗺️ ${activity.area}` : ""}
${activity.duration ? `<br>⏱️ Durata: ${formatDuration(activity.duration)}` : ""}
                        </span>

                        <div class="activity-actions">
                            <button class="edit-activity" onclick="editActivity(this)">
                                ✏️ Modifica
                            </button>

                            <button class="delete-activity" onclick="deleteActivity(this)">
                                🗑️ Elimina
                            </button>
                        </div>
                    </div>
                `).join("")}
            </div>
        `
        : ""
}

    ${
        afternoonActivities.length > 0
            ? `
            <div class="period-section" data-period="afternoon">
                <h4>🌤️ Pomeriggio</h4>
                ${afternoonActivities.map(activity => `
                    <div class="activity-item">
                        <span class="activity-text">
                            ⏰ ${activity.time} — 📍 ${activity.name}
${activity.area ? ` — 🗺️ ${activity.area}` : ""}
${activity.duration ? `<br>⏱️ Durata: ${formatDuration(activity.duration)}` : ""}
                        </span>

                        <div class="activity-actions">
                            <button class="edit-activity" onclick="editActivity(this)">
                                ✏️ Modifica
                            </button>

                            <button class="delete-activity" onclick="deleteActivity(this)">
                                🗑️ Elimina
                            </button>
                        </div>
                    </div>
                `).join("")}
                </div>
            `
            : ""
    }

    ${
        eveningActivities.length > 0
            ? `
            <div class="period-section" data-period="evening">
                <h4>🌙 Sera</h4>
                ${eveningActivities.map(activity => `
                    <div class="activity-item">
                        <span class="activity-text">
                            ⏰ ${activity.time} — 📍 ${activity.name}
${activity.area ? ` — 🗺️ ${activity.area}` : ""}
${activity.duration ? `<br>⏱️ Durata: ${formatDuration(activity.duration)}` : ""}
                        </span>

                        <div class="activity-actions">
                            <button class="edit-activity" onclick="editActivity(this)">
                                ✏️ Modifica
                            </button>

                            <button class="delete-activity" onclick="deleteActivity(this)">
                                🗑️ Elimina
                            </button>
                        </div>
                    </div>
                `).join("")}
                </div>
            `
            : ""
    }

</div>
            
        </div>

        <button class="add-activity" onclick="addActivity(${i})">
            + Aggiungi attività
        </button>
    </div>
`;
}
result.innerHTML = `
    <h2>✈️ Il tuo viaggio a ${cityData.name}</h2>
    <p>🗓️ Partenza: ${startDate}</p>
    <p>🌙 Durata: ${days} ${days == 1 ? "giorno" : "giorni"}</p>

    <div class="days-list">
        ${daysHtml}
    </div>
`;
});


let selectedDay = null;
let editingItem = null;
let formMode = "add";

function addActivity(day) {
    formMode = "add";
editingItem = null;
document.getElementById("activity-form-title").textContent =
    "➕ Aggiungi attività";
    selectedDay = day;

    const form = document.getElementById("activity-form");
    const errorMessage = document.getElementById("activity-error");

errorMessage.textContent = "";
errorMessage.classList.add("hidden");
    const timeInput = document.getElementById("activity-time");
    const nameInput = document.getElementById("activity-name");

    const activitiesContainer =
        document.getElementById(`activities-${day}`);

    timeInput.value = "";
    nameInput.value = "";

    activitiesContainer.insertAdjacentElement("afterend", form);

    form.classList.remove("hidden");
}
function editActivity(button) {
    formMode = "edit";
    document.getElementById("activity-form-title").textContent =
    "✏️ Modifica attività";

    editingItem = button.closest(".activity-item");

    const activityText =
        editingItem.querySelector(".activity-text").textContent.trim();

    const cleanedText = activityText
        .replace("⏰", "")
        .replace("📍", "")
        .trim();

    const parts = cleanedText.split("—");

    const currentTime = parts[0].trim();
    const currentActivity = parts.slice(1).join("—").trim();

    const form = document.getElementById("activity-form");
    const timeInput = document.getElementById("activity-time");
    const nameInput = document.getElementById("activity-name");

    timeInput.value = currentTime;
    nameInput.value = currentActivity;

    const activitiesContainer =
        editingItem.closest(".activities");

    activitiesContainer.insertAdjacentElement("afterend", form);

    form.classList.remove("hidden");
}

function deleteActivity(button) {
    const activityItem = button.closest(".activity-item");
    const activitiesContainer = activityItem.parentElement;

    activityItem.remove();
    const periodSection = activitiesContainer.closest(".period-section");

if (
    periodSection &&
    periodSection.querySelectorAll(".activity-item").length === 0
) {
    periodSection.remove();
}

    if (activitiesContainer.children.length === 0) {
        activitiesContainer.innerHTML =
            '<p class="empty-message">Nessuna attività inserita</p>';
    }
    saveTrip();
}
document.getElementById("cancel-activity").addEventListener("click", function () {
    const form = document.getElementById("activity-form");
    const timeInput = document.getElementById("activity-time");
    const nameInput = document.getElementById("activity-name");

    form.classList.add("hidden");

    timeInput.value = "";
    nameInput.value = "";

    formMode = "add";
    editingItem = null;

    document.getElementById("activity-form-title").textContent =
        "➕ Aggiungi attività";
        const errorMessage = document.getElementById("activity-error");

errorMessage.textContent = "";
errorMessage.classList.add("hidden");
});
document.getElementById("save-activity").addEventListener("click", function () {

    const time = document.getElementById("activity-time").value;
    const activity = document.getElementById("activity-name").value;
    const form = document.getElementById("activity-form");

    if (time === "" || activity.trim() === "") {
        alert("Inserisci sia l'orario che l'attività.");
        return;
    }

    let activitiesContainer;

    // MODIFICA DI UN'ATTIVITÀ ESISTENTE
    if (formMode === "edit" && editingItem) {
        activitiesContainer = editingItem.closest(".activities");
    } else {
        // AGGIUNTA DI UNA NUOVA ATTIVITÀ
        activitiesContainer =
            document.getElementById(`activities-${selectedDay}`);
    }

    if (!activitiesContainer) {
        alert("Errore: giorno non trovato.");
        return;
    }
    const existingItems = Array.from(
    activitiesContainer.querySelectorAll(".activity-item")
);

const duplicateTime = existingItems.some(item => {
    // Se sto modificando, ignoro l'attività stessa
    if (formMode === "edit" && item === editingItem) {
        return false;
    }

    const text = item.querySelector(".activity-text").textContent;

    const match = text.match(/(\d{1,2}):(\d{2})/);

    if (!match) {
        return false;
    }

    const existingTime =
        `${match[1].padStart(2, "0")}:${match[2]}`;

    return existingTime === time;
});

if (duplicateTime) {
    const errorMessage = document.getElementById("activity-error");

    errorMessage.textContent =
        "⚠️ Esiste già un'attività a questo orario.";

    errorMessage.classList.remove("hidden");

    return;
}

    const hour = parseInt(time.split(":")[0]);

    let period = "";

    if (hour < 12) {
        period = "morning";
    } else if (hour < 18) {
        period = "afternoon";
    } else {
        period = "evening";
    }

    let periodSection = activitiesContainer.querySelector(
        `.period-section[data-period="${period}"]`
    );

    if (!periodSection) {
        periodSection = document.createElement("div");
        periodSection.classList.add("period-section");
        periodSection.dataset.period = period;

        let title = "";

        if (period === "morning") {
            title = "☀️ Mattina";
        } else if (period === "afternoon") {
            title = "🌤️ Pomeriggio";
        } else {
            title = "🌙 Sera";
        }

        periodSection.innerHTML = `<h4>${title}</h4>`;
        activitiesContainer.appendChild(periodSection);
    }

    let activityItem;

    // SE STIAMO MODIFICANDO
    if (formMode === "edit" && editingItem) {

        const oldPeriodSection =
            editingItem.closest(".period-section");

        editingItem.querySelector(".activity-text").textContent =
            `⏰ ${time} — 📍 ${activity}`;

        periodSection.appendChild(editingItem);

        if (
            oldPeriodSection &&
            oldPeriodSection !== periodSection &&
            oldPeriodSection.querySelectorAll(".activity-item").length === 0
        ) {
            oldPeriodSection.remove();
        }

        activityItem = editingItem;

    } else {

        // SE STIAMO AGGIUNGENDO
        activityItem = document.createElement("div");
        activityItem.classList.add("activity-item");

        activityItem.innerHTML = `
            <span class="activity-text">
                ⏰ ${time} — 📍 ${activity}
            </span>

            <div class="activity-actions">
                <button class="edit-activity" onclick="editActivity(this)">
                    ✏️ Modifica
                </button>

                <button class="delete-activity" onclick="deleteActivity(this)">
                    🗑️ Elimina
                </button>
            </div>
        `;

        periodSection.appendChild(activityItem);
    }

    // ORDINA LE ATTIVITÀ PER ORARIO
    const activityItems = Array.from(
        periodSection.querySelectorAll(".activity-item")
    );

    activityItems.sort((a, b) => {

        const timeA = a.querySelector(".activity-text")
            .textContent.match(/(\d{1,2}):(\d{2})/);

        const timeB = b.querySelector(".activity-text")
            .textContent.match(/(\d{1,2}):(\d{2})/);

        const minutesA =
            parseInt(timeA[1]) * 60 + parseInt(timeA[2]);

        const minutesB =
            parseInt(timeB[1]) * 60 + parseInt(timeB[2]);

        return minutesA - minutesB;
    });

    activityItems.forEach(item => {
        periodSection.appendChild(item);
        saveTrip();
    });

    // CHIUDE E RESETTA IL MODULO
    form.classList.add("hidden");

    document.getElementById("activity-time").value = "";
    document.getElementById("activity-name").value = "";

    formMode = "add";
    editingItem = null;

    document.getElementById("activity-form-title").textContent =
        "➕ Aggiungi attività";
});
function saveTrip() {
    const result = document.getElementById("trip-result");

    const tripData = {
        destination: document.getElementById("destination").value,
        startDate: document.getElementById("start-date").value,
        days: document.getElementById("days").value,
        resultHtml: result.innerHTML
    };

    localStorage.setItem("savedTrip", JSON.stringify(tripData));
}
function loadTrip() {
    const savedTrip = localStorage.getItem("savedTrip");

    if (savedTrip) {
        const tripData = JSON.parse(savedTrip);

        document.getElementById("destination").value =
            tripData.destination || "";

        document.getElementById("start-date").value =
            tripData.startDate || "";

        document.getElementById("days").value =
            tripData.days || "";

        document.getElementById("trip-result").innerHTML =
            tripData.resultHtml || "";
    }
}

loadTrip();
document.getElementById("new-trip").addEventListener("click", function () {
    const confirmed = confirm(
    "Vuoi davvero cancellare il viaggio e crearne uno nuovo?"
);

if (!confirmed) {
    return;
}

    localStorage.removeItem("savedTrip");

    document.getElementById("destination").value = "";
    document.getElementById("start-date").value = "";
    document.getElementById("days").value = "";

    document.getElementById("trip-result").innerHTML = "";

    const form = document.getElementById("activity-form");
    form.classList.add("hidden");

    document.getElementById("activity-time").value = "";
    document.getElementById("activity-name").value = "";

    formMode = "add";
    editingItem = null;
    selectedDay = null;
});