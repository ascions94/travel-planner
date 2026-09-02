const destinations = {
    londra: {
    name: "Londra",
    country: "Regno Unito",

    nearbyZones: {
        "Londra Centro": ["Londra Ovest", "Londra Est", "Londra Nord"],
        "Londra Ovest": ["Londra Centro", "Londra Nord"],
        "Londra Est": ["Londra Centro", "Londra Nord"],
        "Londra Nord": ["Londra Centro", "Londra Ovest", "Londra Est"]
    },

    dayGroups: [
        {
            name: "Westminster e West End",
            zones: ["Londra Centro"]
        },
        {
            name: "Tower e South Bank",
            zones: ["Londra Est"]
        },
        {
            name: "Kensington e Notting Hill",
            zones: ["Londra Ovest"]
        },
        {
            name: "Camden e Londra Nord",
            zones: ["Londra Nord"]
        }
    ],

    activities: [

        // =========================
        // LONDRA CENTRO
        // =========================

        {
            time: "09:00",
            name: "Big Ben e Palazzo di Westminster",
            area: "Westminster",
            zone: "Londra Centro",
            priority: 3,
            duration: 90,
            preferredPeriod: "morning"
        },

        {
            time: "11:00",
            name: "Westminster Abbey",
            area: "Westminster",
            zone: "Londra Centro",
            priority: 3,
            duration: 90,
            preferredPeriod: "morning"
        },

        {
            time: "09:30",
            name: "British Museum",
            area: "Bloomsbury",
            zone: "Londra Centro",
            priority: 3,
            duration: 150,
            preferredPeriod: "morning"
        },

        {
            time: "14:00",
            name: "Buckingham Palace",
            area: "Westminster",
            zone: "Londra Centro",
            priority: 3,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "16:00",
            name: "Covent Garden",
            area: "Covent Garden",
            zone: "Londra Centro",
            priority: 2,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "17:30",
            name: "Trafalgar Square",
            area: "West End",
            zone: "Londra Centro",
            priority: 2,
            duration: 60,
            preferredPeriod: "afternoon"
        },

        {
            time: "19:00",
            name: "Soho",
            area: "Soho",
            zone: "Londra Centro",
            priority: 2,
            duration: 90,
            preferredPeriod: "evening"
        },

        {
            time: "21:00",
            name: "Piccadilly Circus",
            area: "West End",
            zone: "Londra Centro",
            priority: 1,
            duration: 60,
            preferredPeriod: "evening"
        },


        // =========================
        // LONDRA EST
        // =========================

        {
            time: "09:00",
            name: "Tower of London",
            area: "Tower Hill",
            zone: "Londra Est",
            priority: 3,
            duration: 180,
            preferredPeriod: "morning"
        },

        {
            time: "11:30",
            name: "Tower Bridge",
            area: "Tower Hill",
            zone: "Londra Est",
            priority: 3,
            duration: 90,
            preferredPeriod: "morning"
        },

        {
            time: "09:30",
            name: "St Paul's Cathedral",
            area: "City of London",
            zone: "Londra Est",
            priority: 3,
            duration: 120,
            preferredPeriod: "morning"
        },

        {
            time: "14:00",
            name: "Borough Market",
            area: "Southwark",
            zone: "Londra Est",
            priority: 2,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "15:30",
            name: "Shakespeare's Globe",
            area: "Southwark",
            zone: "Londra Est",
            priority: 2,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "17:30",
            name: "Tate Modern",
            area: "South Bank",
            zone: "Londra Est",
            priority: 2,
            duration: 120,
            preferredPeriod: "afternoon"
        },

        {
            time: "19:30",
            name: "London Eye",
            area: "South Bank",
            zone: "Londra Est",
            priority: 3,
            duration: 60,
            preferredPeriod: "evening"
        },

        {
            time: "21:00",
            name: "Passeggiata sulla South Bank",
            area: "South Bank",
            zone: "Londra Est",
            priority: 1,
            duration: 60,
            preferredPeriod: "evening"
        },


        // =========================
        // LONDRA OVEST
        // =========================

        {
            time: "09:00",
            name: "Natural History Museum",
            area: "South Kensington",
            zone: "Londra Ovest",
            priority: 3,
            duration: 150,
            preferredPeriod: "morning"
        },

        {
            time: "09:30",
            name: "Victoria and Albert Museum",
            area: "South Kensington",
            zone: "Londra Ovest",
            priority: 2,
            duration: 120,
            preferredPeriod: "morning"
        },

        {
            time: "10:00",
            name: "Notting Hill",
            area: "Notting Hill",
            zone: "Londra Ovest",
            priority: 2,
            duration: 120,
            preferredPeriod: "morning"
        },

        {
            time: "14:00",
            name: "Kensington Palace",
            area: "Kensington",
            zone: "Londra Ovest",
            priority: 2,
            duration: 120,
            preferredPeriod: "afternoon"
        },

        {
            time: "16:30",
            name: "Hyde Park",
            area: "Hyde Park",
            zone: "Londra Ovest",
            priority: 2,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "18:30",
            name: "Portobello Road",
            area: "Notting Hill",
            zone: "Londra Ovest",
            priority: 1,
            duration: 90,
            preferredPeriod: "evening"
        },

        {
            time: "20:30",
            name: "Harrods",
            area: "Knightsbridge",
            zone: "Londra Ovest",
            priority: 1,
            duration: 60,
            preferredPeriod: "evening"
        },


        // =========================
        // LONDRA NORD
        // =========================

        {
            time: "09:00",
            name: "Regent's Park",
            area: "Regent's Park",
            zone: "Londra Nord",
            priority: 2,
            duration: 90,
            preferredPeriod: "morning"
        },

        {
            time: "10:30",
            name: "Primrose Hill",
            area: "Primrose Hill",
            zone: "Londra Nord",
            priority: 2,
            duration: 60,
            preferredPeriod: "morning"
        },

        {
            time: "11:30",
            name: "British Library",
            area: "King's Cross",
            zone: "Londra Nord",
            priority: 2,
            duration: 90,
            preferredPeriod: "morning"
        },

        {
            time: "14:00",
            name: "Camden Market",
            area: "Camden",
            zone: "Londra Nord",
            priority: 3,
            duration: 120,
            preferredPeriod: "afternoon"
        },

        {
            time: "16:30",
            name: "King's Cross e St Pancras",
            area: "King's Cross",
            zone: "Londra Nord",
            priority: 2,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "18:30",
            name: "Coal Drops Yard",
            area: "King's Cross",
            zone: "Londra Nord",
            priority: 1,
            duration: 60,
            preferredPeriod: "evening"
        },

        {
            time: "20:00",
            name: "Camden Town",
            area: "Camden",
            zone: "Londra Nord",
            priority: 2,
            duration: 90,
            preferredPeriod: "evening"
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

        // =========================
        // PARIGI OVEST
        // =========================

        {
            time: "09:00",
            name: "Torre Eiffel",
            area: "Torre Eiffel",
            zone: "Parigi Ovest",
            priority: 3,
            duration: 120,
            preferredPeriod: "morning"
        },

        {
            time: "11:30",
            name: "Trocadéro",
            area: "Torre Eiffel",
            zone: "Parigi Ovest",
            priority: 2,
            duration: 60,
            preferredPeriod: "morning"
        },

        {
            time: "10:00",
            name: "Hôtel des Invalides",
            area: "Invalides",
            zone: "Parigi Ovest",
            priority: 2,
            duration: 120,
            preferredPeriod: "morning"
        },

        {
            time: "15:00",
            name: "Arco di Trionfo",
            area: "Champs-Élysées",
            zone: "Parigi Ovest",
            priority: 3,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "17:00",
            name: "Champs-Élysées",
            area: "Champs-Élysées",
            zone: "Parigi Ovest",
            priority: 2,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "19:00",
            name: "Pont Alexandre III",
            area: "Senna",
            zone: "Parigi Ovest",
            priority: 1,
            duration: 60,
            preferredPeriod: "evening"
        },


        // =========================
        // PARIGI CENTRO
        // =========================

        {
            time: "09:00",
            name: "Museo del Louvre",
            area: "Louvre",
            zone: "Parigi Centro",
            priority: 3,
            duration: 180,
            preferredPeriod: "morning"
        },

        {
            time: "09:30",
            name: "Musée d'Orsay",
            area: "Saint-Germain",
            zone: "Parigi Centro",
            priority: 2,
            duration: 120,
            preferredPeriod: "morning"
        },

        {
            time: "13:00",
            name: "Jardin des Tuileries",
            area: "Louvre",
            zone: "Parigi Centro",
            priority: 2,
            duration: 60,
            preferredPeriod: "afternoon"
        },

        {
            time: "14:30",
            name: "Palais Royal",
            area: "Palais Royal",
            zone: "Parigi Centro",
            priority: 2,
            duration: 60,
            preferredPeriod: "afternoon"
        },

        {
            time: "16:00",
            name: "Opéra Garnier",
            area: "Opéra",
            zone: "Parigi Centro",
            priority: 3,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "21:00",
            name: "Crociera sulla Senna",
            area: "Senna",
            zone: "Parigi Centro",
            priority: 2,
            duration: 75,
            preferredPeriod: "evening"
        },


        // =========================
        // PARIGI STORICA
        // =========================

        {
            time: "09:30",
            name: "Île de la Cité",
            area: "Île de la Cité",
            zone: "Parigi Storica",
            priority: 2,
            duration: 60,
            preferredPeriod: "morning"
        },

        {
            time: "11:00",
            name: "Notre-Dame",
            area: "Île de la Cité",
            zone: "Parigi Storica",
            priority: 3,
            duration: 90,
            preferredPeriod: "morning"
        },

        {
            time: "13:00",
            name: "Sainte-Chapelle",
            area: "Île de la Cité",
            zone: "Parigi Storica",
            priority: 3,
            duration: 60,
            preferredPeriod: "afternoon"
        },

        {
            time: "14:30",
            name: "Jardin du Luxembourg",
            area: "Quartiere Latino",
            zone: "Parigi Storica",
            priority: 2,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "16:30",
            name: "Quartiere Latino",
            area: "Quartiere Latino",
            zone: "Parigi Storica",
            priority: 2,
            duration: 120,
            preferredPeriod: "afternoon"
        },

        {
            time: "19:00",
            name: "Panthéon",
            area: "Quartiere Latino",
            zone: "Parigi Storica",
            priority: 1,
            duration: 60,
            preferredPeriod: "evening"
        },


        // =========================
        // PARIGI EST
        // =========================

        {
            time: "09:30",
            name: "Place des Vosges",
            area: "Le Marais",
            zone: "Parigi Est",
            priority: 2,
            duration: 60,
            preferredPeriod: "morning"
        },

        {
            time: "10:00",
            name: "Cimitero Père-Lachaise",
            area: "Père-Lachaise",
            zone: "Parigi Est",
            priority: 2,
            duration: 120,
            preferredPeriod: "morning"
        },

        {
            time: "11:00",
            name: "Centre Pompidou",
            area: "Beaubourg",
            zone: "Parigi Est",
            priority: 2,
            duration: 120,
            preferredPeriod: "morning"
        },

        {
            time: "14:00",
            name: "Le Marais",
            area: "Le Marais",
            zone: "Parigi Est",
            priority: 3,
            duration: 120,
            preferredPeriod: "afternoon"
        },

        {
            time: "16:30",
            name: "Coulée Verte René-Dumont",
            area: "Bastille",
            zone: "Parigi Est",
            priority: 1,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "19:00",
            name: "Place de la Bastille",
            area: "Bastille",
            zone: "Parigi Est",
            priority: 1,
            duration: 60,
            preferredPeriod: "evening"
        },


        // =========================
        // PARIGI NORD
        // =========================

        {
            time: "09:30",
            name: "Basilica del Sacré-Cœur",
            area: "Montmartre",
            zone: "Parigi Nord",
            priority: 3,
            duration: 90,
            preferredPeriod: "morning"
        },

        {
            time: "11:30",
            name: "Place du Tertre",
            area: "Montmartre",
            zone: "Parigi Nord",
            priority: 2,
            duration: 60,
            preferredPeriod: "morning"
        },

        {
            time: "14:00",
            name: "Musée de Montmartre",
            area: "Montmartre",
            zone: "Parigi Nord",
            priority: 2,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "15:30",
            name: "Canal Saint-Martin",
            area: "Canal Saint-Martin",
            zone: "Parigi Nord",
            priority: 2,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "17:30",
            name: "Parc des Buttes-Chaumont",
            area: "Buttes-Chaumont",
            zone: "Parigi Nord",
            priority: 1,
            duration: 90,
            preferredPeriod: "afternoon"
        },

        {
            time: "20:30",
            name: "Pigalle",
            area: "Pigalle",
            zone: "Parigi Nord",
            priority: 1,
            duration: 90,
            preferredPeriod: "evening"
        }
    ]
}
};