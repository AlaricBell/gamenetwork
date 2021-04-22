import connect from '../../../database/dbConnect';
import axios from 'axios';
import ApexProfile from '../../../models/ApexProfile';

export default async (req, res) => {
    connect();
    const {
        query: { id },
      } = req

    if(id.length !== 2) {
        res.redirect(`/?error=no-profile-found`);
        return;
    }

    try {
        const profileData = await axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${id[0]}/${id[1]}`, {
            headers: {
                "TRN-Api-Key": "118bb531-6dd5-453e-bb0e-5347ef1252dd"
            }
        });

        if(profileData.errors && profileData.errors.length > 0) {
            res.redirect(`/?error=no-profile-found`);
            return;
        }

        const matchHistory = await axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${id[0]}/${id[1]}/sessions`, {
            headers: {
                "TRN-Api-Key": "118bb531-6dd5-453e-bb0e-5347ef1252dd"
            }
        });

        if(matchHistory.errors && matchHistory.errors.length > 0) {
            res.redirect(`/?error=no-profile-found`);
            return;
        }

        const profiles = await ApexProfile.find({});
        let profile = profiles.filter(p => p.data.platformInfo.platformUserId == id[1]);
        const accountInformation = Object.assign({}, profileData.data.data, {matchHistory: matchHistory.data.data});

        if(profile.length == 0) {
            profile = await ApexProfile.create({data: accountInformation});  
            const response = profile.save();
            res.status(200).redirect(`/apex/${profile._id}`);
        } else {
            profile = await ApexProfile.findByIdAndUpdate(profile[0]._id, accountInformation, {
                new: true,
                runValidators: true
            })

            if(!profile) {
                res.redirect(`/?error=no-profile-found`);
                return;
            }
            res.status(200).redirect(`/apex/${profile._id}`);
        }
    } catch(error) {
        res.redirect(`/?error=no-profile-found`);
        return;
    }
}