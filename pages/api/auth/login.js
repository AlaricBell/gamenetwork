import connect from '../../../database/dbConnect';
import { compare } from 'bcrypt';
import User from '../../../models/User';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

export default async (req, res) => {
      connect();
      if(req.method === 'POST') {
            try {
                  const user = await User.findOne({email: req.body.email});
                  compare(req.body.password, user.password, function(err, result) {
                        if (!err && result) {
                              const claims = { sub: user._id, userEmail: user.email };
                              const jwt = sign(claims, process.env.SECRET, { expiresIn: '2h' });

                              res.setHeader('Set-Cookie', [cookie.serialize('authToken', jwt, {
                                    httpOnly: true,
                                    sameSite: true,
                                    maxAge: 7200,
                                    path: '/'
                              }), cookie.serialize('email', user.email, {
                                    httpOnly: true,
                                    sameSite: true,
                                    maxAge: 7200,
                                    path: '/'
                              })]);
                              
                              res.status(200).redirect("/admin/desktop");
                        } else {
                              res.redirect(`/admin?error=invalid-password-provided`);
                        }
                  });
            } catch(e) {
                  res.redirect(`/admin?error=invalid-password-or-email-provided`);
            }
            
      } else {
            res.redirect(`/admin?error=invalid-request-provided`);
      } 
}