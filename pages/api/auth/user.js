import connect from '../../../database/dbConnect';
import { verify } from 'jsonwebtoken';
import User from '../../../models/User';

export const authenticated = (fn) => async (req, res) => {
    verify(req.cookies.authToken, process.env.SECRET, async function(err, decoded) {
      if (!err && decoded) {
        return await fn(req, res);
      }
  
      res.redirect(`/admin/desktop?error=Authentication-denied`);
    });
  };
  
  export default authenticated(async function(req, res) {
    connect();
    const users = await User.findOne({email: req.body.email});
  
    return res.json(users);
  });