const titles = {
    data: {
        games: [
            {
                name: "apex",
                displayName: "Apex Legends",
                description: "Apex Legends is a multiplayer shooter game, where you can compete as solo player or with your friends in a battle royale environment.",
                tags: ["multiplayer", "battle royale", "shooter"],
                platforms: [
                    {
                        platformDisplay: "Origin",
                        platformValue: "origin"
                    },
                    {
                        platformDisplay: "PS",
                        platformValue: "psn"
                    },
                    {
                        platformDisplay: "Xbox",
                        platformValue: "xbl"
                    },
                ],
            },
            {
                name: "league-of-legends",
                displayName: "League of Legends",
                description: "Apex Legends is a multiplayer shooter game, where you can compete as solo player or with your friends in a battle royale environment.",
                tags: ["multiplayer", "battle royale", "shooter"],
                platforms: [
                    {
                        platformDisplay: "PC",
                        platformValue: "origin"
                    },
                ],
            },
            {
                name: "valorant",
                displayName: "Valorant",
                description: "Apex Legends is a multiplayer shooter game, where you can compete as solo player or with your friends in a battle royale environment.",
                tags: ["multiplayer", "battle royale", "shooter"],
                platforms: [
                    {
                        platformDisplay: "Origin",
                        platformValue: "origin"
                    },
                    {
                        platformDisplay: "Playstation",
                        platformValue: "psn"
                    },
                    {
                        platformDisplay: "Xbox",
                        platformValue: "xbl"
                    },
                ],
            },
            {
                name: "rainbow-six",
                displayName: "Rainbow Six",
                description: "Apex Legends is a multiplayer shooter game, where you can compete as solo player or with your friends in a battle royale environment.",
                tags: ["multiplayer", "battle royale", "shooter"],
                platforms: [
                    {
                        platformDisplay: "Origin",
                        platformValue: "origin"
                    },
                    {
                        platformDisplay: "Playstation",
                        platformValue: "psn"
                    },
                    {
                        platformDisplay: "Xbox",
                        platformValue: "xbl"
                    },
                ],
            },
            {
                name: "destiny-2",
                displayName: "Destiny 2",
                description: "Apex Legends is a multiplayer shooter game, where you can compete as solo player or with your friends in a battle royale environment.",
                tags: ["multiplayer", "battle royale", "shooter"],
                platforms: [
                    {
                        platformDisplay: "Origin",
                        platformValue: "origin"
                    },
                    {
                        platformDisplay: "Playstation",
                        platformValue: "psn"
                    },
                    {
                        platformDisplay: "Xbox",
                        platformValue: "xbl"
                    },
                ],
            },
            {
                name: "teamfight-tactics",
                displayName: "Teamfight Tactics",
                description: "Apex Legends is a multiplayer shooter game, where you can compete as solo player or with your friends in a battle royale environment.",
                tags: ["multiplayer", "battle royale", "shooter"],
                platforms: [
                    {
                        platformDisplay: "Origin",
                        platformValue: "origin"
                    },
                    {
                        platformDisplay: "Playstation",
                        platformValue: "psn"
                    },
                    {
                        platformDisplay: "Xbox",
                        platformValue: "xbl"
                    },
                ],
            }
        ]
    }
}

export function getAllGameId() {
    return titles.data.games.map(game => `/form/${game.name}`);
    // connect();
    // const profiles = Profile.find({});
    // console.log(profiles.map(profile => {
    //     const id = profile._id.toString();
    //     return {
    //         params: {
    //             id
    //         }
    //     }
    // }));
    //return profiles;
    //return profiles.map(profile => `/profile/${profile._id}`);
}

export function getAllGameData() {
    return titles.data.games;
}

export function getGameDataById(title) {
    return titles.data.games.filter(game => game.name == title)[0];
}