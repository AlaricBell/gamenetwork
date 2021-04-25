import connect from '../../../database/dbConnect';
import User from '../../../models/User';
import { hash } from 'bcrypt';

export default async (req, res) => {
  let users = await User.find({});
  if(users.length === 0) {
    connect();
    hash(process.env.ADMIN, 10, async function(err, hash) {
      try {
          const user = await User.create({email: "admin@admin.com",
                                          password: hash});  
          const responseUser = user.save();
          res.redirect(`/admin`);
      } catch(e) {
        console.log(e);
        res.redirect(`/admin?error=there-was-an-error-setting-the-admin`);
      }
    });
  } else {
    res.redirect(`/admin?error=admin-db-is-not-empty`);
  }
}