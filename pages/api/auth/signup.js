import connect from '../../../database/dbConnect';
import User from '../../../models/User';
import UserHistory from '../../../models/UserHistory';
import { hash } from 'bcrypt';

export default async (req, res) => {
    connect();
    if(req.method === 'POST') {
        if(req.body.password === req.body.passwordconfirm) {
            hash(req.body.password, 10, async function(err, hash) {
                try {
                    const user = await User.create({email: req.body.email,
                                                    password: hash});  
                    const responseUser = user.save();

                    const userHistory = await UserHistory.create({message: `Admin ${req.body.email} has been registered`});  
                    const responseHistory = userHistory.save();
                    res.status(200).redirect('/admin/desktop');
                } catch {
                    res.status(401).json({message: `User already exists`});
                }
            });
        } else {
            res.status(401).json({message: `Passwords do not match!`});
        }
    } else if(req.method === 'DELETE') {
        const responseUser = await User.deleteOne({email: req.body.email});
    } else {
        res.status(401).json({message: `Only post request is accepted`});
    } 
}