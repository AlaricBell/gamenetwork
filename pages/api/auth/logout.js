import connect from '../../../database/dbConnect';
import { compare } from 'bcrypt';
import User from '../../../models/User';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

export default async (req, res) => {
      connect();
      if(req.method === 'POST') {
            const user = await User.findOne({email: req.body.email});
              const claims = { sub: user._id, userEmail: user.email };
              const jwt = sign(claims, process.env.SECRET, { expiresIn: '2h' });

              res.setHeader('Set-Cookie', [cookie.serialize('authToken', jwt, {
                    httpOnly: true,
                    sameSite: true,
                    maxAge: 0,
                    path: '/'
              }), cookie.serialize('email', user.email, {
                    httpOnly: true,
                    sameSite: true,
                    maxAge: 0,
                    path: '/'
              })]);
              
              res.status(200).redirect("/");
        } else {
            res.redirect(`/admin/desktop?error=invalid-request-provided`);
        } 
}