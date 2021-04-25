import connect from '../../../database/dbConnect';
import Game from '../../../models/Game';
import UserHistory from '../../../models/UserHistory';

const handleDisplayName = (name) => {
  switch(name) {
    case "psn":
      return "PS";
    case "xbl":
      return "Xbox";
    case "origin":
      return "Origin";
    case "steam":
      return "Steam";
    case "battlenet":
      return "Battlenet";
  }
}

export default async (req, res) => {
    connect();
    if(req.method === 'POST') {
      try {
          let platforms = req.body.platform.map(platform => {
                            return {platformDisplay: handleDisplayName(platform),
                                    platformValue: platform}
                          });
          
          const game = await Game.create({name: req.body.name,
                                          displayName: req.body.displayName,
                                          tags: req.body.tag,
                                          platforms});  
          const responseGame = game.save();

          const userHistory = await UserHistory.create({message: `Game ${req.body.displayName} has been registered`});  
          const responseHistory = userHistory.save();
          res.status(200).redirect('/admin/desktop');
      } catch {
          res.redirect(`/admin/desktop?error=game-already-exists`);
      }
    } else if(req.method === 'DELETE') {
      try {
        const userHistory = await UserHistory.create({message: `Game ${req.body.displayName} has been deleted`});  
        const responseHistory = userHistory.save();
        const responseGame = await Game.deleteOne({name: req.body.name});
      } catch {
        res.redirect(`/admin/desktop?error=could-not-delete-${req.body.name}`);
      }
    }
    else {
        res.redirect(`/admin/desktop?error=invalid-request-provided`);
    } 
}