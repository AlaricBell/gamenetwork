import connect from '../../../database/dbConnect';
import axios from 'axios';
let Profile = require('../../../models/Profile');

connect();

export default async (req, res) => {
    const {
        query: { id },
      } = req

    if(id.length != 2) {
        return res.status(404).json({message: "Invalid arguments in URI"});
    }

    try {
        const data = await axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${id[0]}/${id[1]}`, {
            headers: {
                "TRN-Api-Key": "118bb531-6dd5-453e-bb0e-5347ef1252dd"
            }
        });

        if(data.errors && data.errors.length > 0) {
            return res.status(404).json({
                message: "Profile not found!"
            })
        }

        const profiles = await Profile.find({});
        let profile = profiles.filter(p => p.data.platformInfo.platformUserId == id[1]);

        if(profile.length == 0) {
            profile = await Profile.create({data: data.data.data});  
            const response = profile.save();
            res.status(200).redirect(`/game/${profile._id}`);
        } else {
            profile = await Profile.findByIdAndUpdate(profile[0]._id, data.data.data, {
                new: true,
                runValidators: true
            })

            if(!profile) {
                return res.status(400).json({success: false});
            }
            res.status(200).redirect(`/game/${profile._id}`);
        }
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}