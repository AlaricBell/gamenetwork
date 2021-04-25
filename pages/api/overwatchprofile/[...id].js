import connect from '../../../database/dbConnect';
import axios from 'axios';
import OverwatchProfile from '../../../models/OverwatchProfile';

export default async (req, res) => {
    connect();
    const {
        query: { id },
      } = req

    if(id.length !== 2) {
        res.redirect(`/?error=no-profile-found`);
        return;
    }

    id[1] = id[1].replace(/#/g, "%23");

    try {
        const profileData = await axios.get(`https://public-api.tracker.gg/v2/overwatch/standard/profile/${id[0]}/${id[1]}`, {
            headers: {
                "TRN-Api-Key": "118bb531-6dd5-453e-bb0e-5347ef1252dd",
                "Accept": "application/json",
                "Accept-Encoding": "gzip"
            }
        });

        if(profileData.errors && profileData.errors.length > 0) {
            res.redirect(`/?error=no-profile-found`);
            return;
        }

        const profiles = await OverwatchProfile.find({});
        let profile = profiles.filter(p => p.data.platformInfo.platformUserId == id[1].replace('%23', '#'));

        if(profile.length === 0) {
            profile = await OverwatchProfile.create({data: profileData.data.data});  
            const response = profile.save();
            res.status(200).redirect(`/overwatch/casual/${profile._id}`);
        } else {
            profile = await OverwatchProfile.findByIdAndUpdate(profile[0]._id, profileData.data.data, {
                new: true,
                runValidators: true
            })

            if(!profile) {
                res.redirect(`/?error=no-profile-found`);
                return;
            }
            res.status(200).redirect(`/overwatch/casual/${profile._id}`);
        }
    } catch(error) {
        res.redirect(`/?error=no-profile-found`);
        return;
    }
}