import connect from '../database/dbConnect';
import ApexProfile from '../models/ApexProfile';
import User from '../models/User';

export async function getOverallApexProfileData(id) {
    connect();
    const profile = await ApexProfile.findById(id);
    return profile.data;
}

export async function getAllApexData() {
    connect();
    const profiles = await ApexProfile.find({});
    return JSON.stringify(profiles.map(profile => {
        return {id: profile._id,
                username: profile.data.platformInfo.platformUserId,
                platform: profile.data.platformInfo.platformSlug}}));
}

export async function getAllUserData() {
    connect();
    const users = await User.find({});
    return JSON.stringify(users.map(user => {
        return {id: user._id,
                email: user.email,
                createdAt: user.createdAt}}));
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

export async function getAllApexSeasonsId() {
    connect();
    const profiles = await ApexProfile.find({});
    return profiles.map(profile => `/apex/seasons/${profile._id}`);
}