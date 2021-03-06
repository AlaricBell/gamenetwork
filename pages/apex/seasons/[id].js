import Layout from '../../../components/layout/layout-main';
import ProfileHeader from '../../../components/profile/profileHeader';
import GraphSeasonOverview from '../../../components/graphs/graphSeasonOverview'
import SeasonLegendDetail from '../../../components/graphs/seasonLegendDetail'
import { getAllGameData } from '../../../lib/games';
import { getAllApexSeasonsId, getOverallApexProfileData } from '../../../lib/profiles';

export async function getStaticPaths() {
    const paths = await getAllApexSeasonsId();
    return {
      paths,
      fallback: false
    }
}

export async function getStaticProps({ params }) {
    const profileData = await getOverallApexProfileData(params.id)
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

const getStatCount = (stats) => {
  let counter = 0;
  if(stats.kills != undefined) 
    counter++;
  if(stats.damage != undefined) 
    counter++;
  if(stats.headshots != undefined) 
    counter++;
  if(stats.winsWithFullSquad != undefined) 
    counter++;
  if(stats.killsAsKillLeader != undefined) 
    counter++;
  if(stats.timesPlacedtop3 != undefined) 
    counter++;
  if(stats.surveyBeaconsScanned != undefined) 
    counter++;
  if(stats.killsPerMatch != undefined) 
    counter++;
  if(stats.tacticalMetersTeleported != undefined) 
    counter++;
  if(stats.beastOfTheHuntKills != undefined) 
    counter++;
  if(stats.doubleTimeDistance != undefined) 
    counter++;
  if(stats.stimDistanceTravelled != undefined) 
    counter++;
  if(stats.winningKills != undefined) 
    counter++;
  if(stats.domeDamageBlocked != undefined) 
    counter++;
  if(stats.finishers != undefined) 
    counter++;
    if(stats.revives != undefined) 
    counter++;
    if(stats.sniperKills != undefined) 
    counter++;
    if(stats.arKills != undefined) 
    counter++;
    if(stats.shotgunKills != undefined) 
    counter++;
    if(stats.pistolKills != undefined) 
    counter++;
    if(stats.smgKills != undefined) 
    counter++;
    if(stats.lmgKills != undefined) 
    counter++;
    if(stats.carePackageKills != undefined) 
    counter++;
    if(stats.voicesWarningsHeard != undefined) 
    counter++;
    if(stats.eyeTrapsScanned != undefined) 
    counter++;
    if(stats.eyeEnemiesScanned != undefined) 
    counter++;
    if(stats.noxGasDamageDealt != undefined) 
    counter++;
    if(stats.noxGassedEnemiesKilled != undefined) 
    counter++;

  return counter;
}

const getLegends = (datas) => {
  const legends = datas.filter(data => data.type == "legend"  && data.metadata != undefined
                                                              && data.stats != undefined
                                                              && data.metadata.name != undefined
                                                              && data.metadata.imageUrl != undefined
                                                              && getStatCount(data.stats) > 0);
  return legends;
}

const renderSeasonalData = (data) => {
  let overview = data[0];
  let win, kills = false;

  if(overview.stats.seasonWins || 
      overview.stats.season2Wins ||
      overview.stats.season3Wins ||
      overview.stats.season4Wins ||
      overview.stats.season5Wins ||
      overview.stats.season6Wins ||
      overview.stats.season7Wins ||
      overview.stats.season8Wins){
          win = true;
  }
  if(overview.stats.seasonKills || 
      overview.stats.season2Kills ||
      overview.stats.season3Kills ||
      overview.stats.season4Kills ||
      overview.stats.season5Kills ||
      overview.stats.season6Kills ||
      overview.stats.season7Kills ||
      overview.stats.season8Kills){
          kills = true;
  }

  if(win || kills) {
    return (
      <>
        <GraphSeasonOverview
        overview={overview}/>

        <SeasonLegendDetail 
        profileData={data}/>
      </>
    )
  } else {
    return (
      <div className="container message-card">
        <h1 className="w-100 text-center py-4">No seasonal data found.</h1>
      </div>
    )
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
            <div className="container-season-header">
                <h4>Season Overview</h4>
                <div className="match-header-data">
                </div>
            </div>

            {renderSeasonalData(profileData.segments)}
          </div>
        </Layout>
    );
}