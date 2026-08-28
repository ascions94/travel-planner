const destinations = {
    londra: {
        name: "Londra",
        country: "Regno Unito",

        activities: [
    {
        time: "09:00",
        name: "Big Ben e Westminster",
        area: "Westminster",
        zone: "Londra Centro",
        priority: 3
    },
    {
        time: "11:00",
        name: "London Eye",
        area: "South Bank",
        zone: "Londra Centro",
        priority: 2
    },
    {
        time: "14:30",
        name: "Buckingham Palace",
        area: "Westminster",
        zone: "Londra Centro",
        priority: 3
    },

    {
        time: "09:30",
        name: "British Museum",
        area: "Bloomsbury",
        zone: "Londra Centro",
        priority: 3
    },
    {
        time: "13:00",
        name: "Covent Garden",
        area: "Covent Garden",
        zone: "Londra Centro",
        priority: 2
    },
    {
        time: "18:00",
        name: "Soho",
        area: "Soho",
        zone: "Londra Centro",
        priority: 2
    },

    {
        time: "09:00",
        name: "Tower of London",
        area: "Tower Hill",
        zone: "Londra Est",
        priority: 3
    },
    {
        time: "11:30",
        name: "Tower Bridge",
        area: "Tower Hill",
        zone: "Londra Est",
        priority: 3
    },
    {
        time: "13:30",
        name: "Borough Market",
        area: "Southwark",
        zone: "Londra Est",
        priority: 2
    },

    {
        time: "09:30",
        name: "Notting Hill",
        area: "Notting Hill",
        zone: "Londra Ovest",
        priority: 2
    },
    {
        time: "12:00",
        name: "Hyde Park",
        area: "Hyde Park",
        zone: "Londra Ovest",
        priority: 2
    },
    {
        time: "17:00",
        name: "Camden Town",
        area: "Camden",
        zone: "Londra Nord",
        priority: 2
    }
]
},
    
    roma: {
    name: "Roma",
    country: "Italia",

    activities: [
    {
        time: "09:00",
        name: "Colosseo",
        area: "Colosseo",
        zone: "Roma Antica",
        priority: 3
    },
    {
        time: "11:00",
        name: "Foro Romano",
        area: "Fori Imperiali",
        zone: "Roma Antica",
        priority: 3
    },
    {
        time: "15:00",
        name: "Fontana di Trevi",
        area: "Trevi",
        zone: "Centro Storico",
        priority: 3
    },

    {
        time: "09:30",
        name: "Pantheon",
        area: "Pantheon",
        zone: "Centro Storico",
        priority: 3
    },
    {
        time: "11:30",
        name: "Piazza Navona",
        area: "Piazza Navona",
        zone: "Centro Storico",
        priority: 2
    },
    {
        time: "18:00",
        name: "Trastevere",
        area: "Trastevere",
        zone: "Trastevere",
        priority: 2
    },

    {
        time: "09:00",
        name: "Musei Vaticani",
        area: "Vaticano",
        zone: "Vaticano",
        priority: 3
    },
    {
        time: "12:00",
        name: "Basilica di San Pietro",
        area: "Vaticano",
        zone: "Vaticano",
        priority: 3
    },
    {
        time: "17:30",
        name: "Castel Sant'Angelo",
        area: "Prati",
        zone: "Vaticano",
        priority: 2
    },

    {
        time: "09:30",
        name: "Villa Borghese",
        area: "Villa Borghese",
        zone: "Roma Nord",
        priority: 2
    },
    {
        time: "12:00",
        name: "Piazza di Spagna",
        area: "Piazza di Spagna",
        zone: "Roma Nord",
        priority: 2
    },
    {
        time: "18:30",
        name: "Terrazza del Pincio",
        area: "Pincio",
        zone: "Roma Nord",
        priority: 1
    }
]
},
parigi: {
    name: "Parigi",
    country: "Francia",
    nearbyZones: {
    "Parigi Ovest": ["Parigi Centro"],
    "Parigi Centro": ["Parigi Ovest", "Parigi Storica"],
    "Parigi Storica": ["Parigi Centro", "Parigi Est"],
    "Parigi Est": ["Parigi Storica"],
    "Parigi Nord": []
},

dayGroups: [
    {
        name: "Parigi Ovest",
        zones: ["Parigi Ovest"]
    },
    {
        name: "Centro e Louvre",
        zones: ["Parigi Centro"]
    },
    {
        name: "Parigi Storica",
        zones: ["Parigi Storica", "Parigi Est"]
    },
    {
        name: "Montmartre",
        zones: ["Parigi Nord"]
    }
],

    activities: [
    {
        time: "09:00",
        name: "Torre Eiffel",
        area: "Torre Eiffel",
        zone: "Parigi Ovest",
        priority: 3
    },
    {
        time: "11:30",
        name: "Trocadéro",
        area: "Torre Eiffel",
        zone: "Parigi Ovest",
        priority: 2
    },
    {
        time: "15:00",
        name: "Arco di Trionfo",
        area: "Champs-Élysées",
        zone: "Parigi Ovest",
        priority: 3
    },

    {
        time: "09:00",
        name: "Museo del Louvre",
        area: "Louvre",
        zone: "Parigi Centro",
        priority: 3
    },
    {
        time: "13:00",
        name: "Jardin des Tuileries",
        area: "Louvre",
        zone: "Parigi Centro",
        priority: 2
    },
    {
        time: "09:30",
        name: "Musée d'Orsay",
        area: "Saint-Germain",
        zone: "Parigi Centro",
        priority: 2
    },

    {
        time: "09:30",
        name: "Île de la Cité",
        area: "Île de la Cité",
        zone: "Parigi Storica",
        priority: 2
    },
    {
        time: "11:00",
        name: "Notre-Dame",
        area: "Île de la Cité",
        zone: "Parigi Storica",
        priority: 3
    },
    {
        time: "15:30",
        name: "Quartiere Latino",
        area: "Quartiere Latino",
        zone: "Parigi Storica",
        priority: 2
    },

    {
        time: "14:00",
        name: "Le Marais",
        area: "Le Marais",
        zone: "Parigi Est",
        priority: 2
    },
    {
        time: "18:00",
        name: "Montmartre e Sacré-Cœur",
        area: "Montmartre",
        zone: "Parigi Nord",
        priority: 3
    },
    {
        time: "19:00",
        name: "Crociera sulla Senna",
        area: "Senna",
        zone: "Parigi Centro",
        priority: 1
    }
]
}
};