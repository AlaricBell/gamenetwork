import connect from '../database/dbConnect';
import Game from '../models/Game';

export async function getAllGameId() {
    connect();
    const games = await Game.find({});
    return games.map(game => `/form/${game.name}`);
}

export async function getAllGameData() {
    connect();
    const games = await Game.find({});
    return JSON.stringify(games.map(game => {
        return game 
    }));
}

export async function getGameDataById(title) {
    connect();
    const game = await Game.findOne({name: title});
    return JSON.stringify(game);
}