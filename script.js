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
        daysHtml += `
    <div class="day-card">
        <h3>Giorno ${i}</h3>

        <div class="activities" id="activities-${i}">
            ${
                dayActivities.length > 0
                    ? dayActivities
    .map(activity => `
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
    `)
    .join("")
                    : '<p class="empty-message">Nessuna attività inserita</p>'
            }
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

    activitiesContainer.appendChild(activityItem);
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
}


function deleteActivity(button) {
    const activityItem = button.closest(".activity-item");
    const activitiesContainer = activityItem.parentElement;

    activityItem.remove();

    if (activitiesContainer.children.length === 0) {
        activitiesContainer.innerHTML =
            '<p class="empty-message">Nessuna attività inserita</p>';
    }
}