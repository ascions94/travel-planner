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
        <h3>Giorno ${i}</h3>

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
function addActivity(day) {
    const time = prompt("A che ora?");
    
    if (time === null || time.trim() === "") {
        return;
    }

    const activity = prompt("Quale attività vuoi aggiungere?");

    if (activity === null || activity.trim() === "") {
        return;
    }

    const activitiesContainer = document.getElementById(`activities-${day}`);
    const hour = parseInt(time.split(":")[0]);

let period = "";

if (hour < 12) {
    period = "morning";
} else if (hour < 18) {
    period = "afternoon";
} else {
    period = "evening";
}

    const emptyMessage = activitiesContainer.querySelector(".empty-message");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    const activityItem = document.createElement("div");
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

periodSection.appendChild(activityItem);
const activityItems = Array.from(
    periodSection.querySelectorAll(".activity-item")
);

activityItems.sort((a, b) => {
    const timeA = a.querySelector(".activity-text")
        .textContent
        .match(/(\d{1,2}):(\d{2})/);

    const timeB = b.querySelector(".activity-text")
        .textContent
        .match(/(\d{1,2}):(\d{2})/);

    if (!timeA || !timeB) {
        return 0;
    }

    const minutesA =
        parseInt(timeA[1]) * 60 + parseInt(timeA[2]);

    const minutesB =
        parseInt(timeB[1]) * 60 + parseInt(timeB[2]);

    return minutesA - minutesB;
});

activityItems.forEach(item => {
    periodSection.appendChild(item);
});
}


function editActivity(button) {
    const activityItem = button.closest(".activity-item");
    const activityText = activityItem.querySelector(".activity-text");

    const fullText = activityText.textContent.trim();

    const cleanedText = fullText
        .replace("⏰", "")
        .replace("📍", "")
        .trim();

    const parts = cleanedText.split("—");

    const currentTime = parts[0].trim();
    const currentActivity = parts.slice(1).join("—").trim();

    const newTime = prompt("Modifica orario:", currentTime);

    if (newTime === null || newTime.trim() === "") {
        return;
    }

    const newActivity = prompt("Modifica attività:", currentActivity);

    if (newActivity === null || newActivity.trim() === "") {
        return;
    }

    activityText.textContent =
        `⏰ ${newTime} — 📍 ${newActivity}`;

    const hour = parseInt(newTime.split(":")[0]);

    let newPeriod = "";

    if (hour < 12) {
        newPeriod = "morning";
    } else if (hour < 18) {
        newPeriod = "afternoon";
    } else {
        newPeriod = "evening";
    }

    const activitiesContainer =
        activityItem.closest(".activities");

    let periodSection = activitiesContainer.querySelector(
        `.period-section[data-period="${newPeriod}"]`
    );

    if (!periodSection) {
        periodSection = document.createElement("div");
        periodSection.classList.add("period-section");
        periodSection.dataset.period = newPeriod;

        let title = "";

        if (newPeriod === "morning") {
            title = "☀️ Mattina";
        } else if (newPeriod === "afternoon") {
            title = "🌤️ Pomeriggio";
        } else {
            title = "🌙 Sera";
        }

        periodSection.innerHTML = `<h4>${title}</h4>`;
        activitiesContainer.appendChild(periodSection);
    }

    const oldPeriodSection = activityItem.closest(".period-section");
    periodSection.appendChild(activityItem);
    if (
    oldPeriodSection &&
    oldPeriodSection !== periodSection &&
    oldPeriodSection.querySelectorAll(".activity-item").length === 0
) {
    oldPeriodSection.remove();
}

    const activityItems = Array.from(
        periodSection.querySelectorAll(".activity-item")
    );

    activityItems.sort((a, b) => {
        const timeA = a.querySelector(".activity-text")
            .textContent
            .match(/(\d{1,2}):(\d{2})/);

        const timeB = b.querySelector(".activity-text")
            .textContent
            .match(/(\d{1,2}):(\d{2})/);

        if (!timeA || !timeB) {
            return 0;
        }

        const minutesA =
            parseInt(timeA[1]) * 60 + parseInt(timeA[2]);

        const minutesB =
            parseInt(timeB[1]) * 60 + parseInt(timeB[2]);

        return minutesA - minutesB;
    });

    activityItems.forEach(item => {
        periodSection.appendChild(item);
    });
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
}