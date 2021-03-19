import connect from '../database/dbConnect';
const ApexProfile = require('../models/ApexProfile');

export async function getOverallApexProfileData(id) {
    connect();
    const profile = await ApexProfile.findById(id);
    return profile.data;
}

export async function getAllApexProfileId() {
    connect();
    const profiles = await ApexProfile.find({});
    return profiles.map(profile => `/apex/${profile._id}`);
}

export async function getAllApexMatchesId() {
    connect();
    const profiles = await ApexProfile.find({});
    return profiles.map(profile => `/apex/matches/${profile._id}`);
}