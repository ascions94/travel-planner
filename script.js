const destinations = {
    londra: [
        { time: "09:00", name: "Big Ben e Westminster" },
        { time: "11:00", name: "London Eye" },
        { time: "14:30", name: "Buckingham Palace" },

        { time: "09:30", name: "British Museum" },
        { time: "13:00", name: "Covent Garden" },
        { time: "18:00", name: "Soho" },

        { time: "09:00", name: "Tower of London" },
        { time: "11:30", name: "Tower Bridge" },
        { time: "13:30", name: "Borough Market" },

        { time: "09:30", name: "Notting Hill" },
        { time: "12:00", name: "Hyde Park" },
        { time: "17:00", name: "Camden Town" }
    ]
};
const button = document.getElementById("create-trip");

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
        const cityKey = destination.toLowerCase();
const cityActivities = destinations[cityKey] || [];

const activitiesPerDay = Math.ceil(cityActivities.length / days);
const startIndex = (i - 1) * activitiesPerDay;
const endIndex = startIndex + activitiesPerDay;

const dayActivities = cityActivities.slice(startIndex, endIndex);
const morningActivities = dayActivities.filter(activity => {
    const hour = parseInt(activity.time.split(":")[0]);
    return hour < 12;
});

const afternoonActivities = dayActivities.filter(activity => {
    const hour = parseInt(activity.time.split(":")[0]);
    return hour >= 12 && hour < 18;
});

const eveningActivities = dayActivities.filter(activity => {
    const hour = parseInt(activity.time.split(":")[0]);
    return hour >= 18;
});
        daysHtml += `
    <div class="day-card">
        <h3>
    Giorno ${i} — ${capitalizedDate}
</h3>

        <div class="activities" id="activities-${i}">

        ${
    morningActivities.length > 0
        ? `
            <div class="period-section" data-period="morning">
                <h4>☀️ Mattina</h4>

                ${morningActivities.map(activity => `
                    <div class="activity-item">
                        <span class="activity-text">
                            ⏰ ${activity.time} — 📍 ${activity.name}
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
    <h2>✈️ Il tuo viaggio a ${destination}</h2>
    <p>🗓️ Partenza: ${startDate}</p>
    <p>🌙 Durata: ${days} giorni</p>

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