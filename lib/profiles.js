import connect from '../database/dbConnect';
let Profile = require('../models/Profile');

export async function getOverallProfileData(id) {
    connect();
    const profile = await Profile.findById(id);
    return profile.data;
}

export function getAllProfileId() {
    connect();
    const profiles = Profile.find({});
    // console.log(profiles.map(profile => {
    //     const id = profile._id.toString();
    //     return {
    //         params: {
    //             id
    //         }
    //     }
    // }));
    return profiles;
    //return profiles.map(profile => `/profile/${profile._id}`);
}