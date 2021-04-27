import Layout from '../../../components/layout/layout-main';
import { getAllApexMatchesId, getOverallApexProfileData } from '../../../lib/profiles';
import ProfileHeader from '../../../components/profile/profileHeader';
import MatchHistory from '../../../components/profile/matchHistory';
import { getAllGameData } from '../../../lib/games';

export async function getStaticPaths() {
    const paths = await getAllApexMatchesId();

    return {
      paths,
      fallback: false
    }
}

export async function getStaticProps({ params }) {
    const profileData = await getOverallApexProfileData(params.id);
    let games = await getAllGameData();
    games = JSON.parse(games);
    return {
      props: {
        profileData,
        games,
        profileId: params.id
      }
    }
}

const getmatchDateInterval = (profileData) => {
    let lastMatch = profileData.matchHistory.items[0];
    let firstMatch = profileData.matchHistory.items[profileData.matchHistory.items.length - 1];

    const date1 = new Date(firstMatch.metadata.endDate.value.replace("T", " "));
    const date2 = new Date(lastMatch.metadata.endDate.value.replace("T", " "));

    return date1.getFullYear() + "." + parseMonth(date1.getMonth()) + "." + date1.getDate() + " - " +
            date2.getFullYear() + "." + parseMonth(date2.getMonth()) + "." + date2.getDate();
}

const parseMonth = (month) =>  {
  switch(month) {
    case 0:
      return "01";
      case 1:
      return "02";
      case 2:
      return "03";
      case 3:
      return "04";
      case 4:
      return "05";
      case 5:
      return "06";
      case 6:
      return "07";
      case 7:
      return "08";
      case 8:
      return "09";
      case 9:
      return "10";
      case 10:
      return "11";
      case 11:
      return "12";
  }
}

export default function Index({profileData, profileId, games}) {
    return (
        <Layout games={games}> 
          <ProfileHeader 
          data={profileData}
          profileId={profileId}
          links={[{path: "apex", display: "Overview"}, {path: "apex/matches", display: "Matches"}, {path: "apex/seasons", display: "Seasons"}]}
          title={"Apex Legends"}/>

          <div className="container pb-4 mt-4">
            <div className="card-match-header">
                <h4>Match history</h4>
                <div className="match-header-data">
                    <p>Total {profileData.matchHistory.items.length} matches</p>
                    <p className="match-header-date">{getmatchDateInterval(profileData)}</p>
                </div>
            </div>
            {profileData.matchHistory.items.map((match, index) => (
                <MatchHistory 
                matchData={match}
                key={index}/>
            ))}
          </div>
        </Layout>
    );
}