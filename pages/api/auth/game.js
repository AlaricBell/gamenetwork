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
          res.status(401).json({message: `Game already exists`});
      }
    } else if(req.method === 'DELETE') {
      const responseGame = await Game.deleteOne({name: req.body.name});
    }
    else {
        res.status(401).json({message: `Only post request is accepted`});
    } 
}