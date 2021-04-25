import Layout from '../../../components/layout/layout-main';
import { getAllOverwatchProfileId, getOverallOverwatchProfileData } from '../../../lib/profiles';
import GraphDetail from '../../../components/graphDetail';
import CharacterCard from '../../../components/profile/characterCard';
import OverwatchOverview from '../../../components/profile/overwatchOverview';
import ProfileHeader from '../../../components/profile/profileHeader';
import HeroOverview from '../../../components/profile/heroOverview';
import { getAllGameData } from '../../../lib/games';

export async function getStaticPaths() {
    const paths = await getAllOverwatchProfileId("competitive");
    return {
      paths,
      fallback: false
    }
}

export async function getStaticProps({ params }) {
    const profileData = await getOverallOverwatchProfileData(params.id);
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

const percentage = (context) => {
  return (100 - context).toPrecision(2);
}

/*********************************************************
******************* VALIDATE ELEMENT *********************
*********************************************************/
const getStatCount = (stats) => {
  let counter = 0;
  if(stats.timePlayed != undefined) 
    counter++;
  if(stats.wins != undefined) 
    counter++;
  if(stats.matchesPlayed != undefined) 
    counter++;
  if(stats.timeSpentOnFire != undefined) 
    counter++;
  if(stats.cards != undefined) 
    counter++;
  if(stats.wlPercentage != undefined) 
    counter++;
  if(stats.medals != undefined) 
    counter++;
  if(stats.goldMedals != undefined) 
    counter++;
  if(stats.silverMedals != undefined) 
    counter++;
  if(stats.bornzeMedals != undefined) 
    counter++;
  if(stats.multiKills != undefined) 
    counter++;
  if(stats.soloKills != undefined) 
    counter++;
  if(stats.objectiveKills != undefined) 
    counter++;
  if(stats.environmentalKills != undefined) 
    counter++;
  if(stats.finalBlows != undefined) 
    counter++;
    if(stats.damageDone != undefined) 
    counter++;
    if(stats.healingDone != undefined) 
    counter++;
    if(stats.eliminations != undefined) 
    counter++;
    if(stats.deaths != undefined) 
    counter++;
    if(stats.kd != undefined) 
    counter++;
    if(stats.kg != undefined) 
    counter++;
    if(stats.objectiveTime != undefined) 
    counter++;
    if(stats.defensiveAssists != undefined) 
    counter++;
    if(stats.offensiveAssists != undefined) 
    counter++;
    if(stats.mostEliminations != undefined) 
    counter++;
    if(stats.mostFinalBlows != undefined) 
    counter++;
    if(stats.mostDamageDone != undefined) 
    counter++;
    if(stats.mostHealingDone != undefined) 
    counter++;
    if(stats.mostDefensiveAssists != undefined) 
    counter++;
    if(stats.mostOffensiveAssists != undefined) 
    counter++;
    if(stats.mostObjectiveKills != undefined) 
    counter++;
    if(stats.mostObjectiveTime != undefined) 
    counter++;
    if(stats.mostSoloKills != undefined) 
    counter++;
    if(stats.mostTimeSpentOnFire != undefined) 
    counter++;

  return counter;
}

const getLegends = (datas) => {
  const legends = datas.filter(data => data.type == "hero" && data.attributes.realm === "competitive" && data.metadata !== undefined
                                                              && data.stats !== undefined
                                                              && getStatCount(data.stats) > 0);
  return legends;
}

export default function Index({profileData, profileId, games}) {
    return (
        <Layout games={games}> 
          <ProfileHeader 
          data={profileData}
          profileId={profileId}
          links={[{path: "overwatch/casual", display: "Casual"}, {path: "overwatch/competitive", display: "Competitive"}]}
          title={"Overwatch"}/>

          <OverwatchOverview 
          profileData={profileData.segments[1]}
          percentage={percentage}/>

          <div className="container pb-4 px-0">
            <row>
              <div className="col-12">
                <div className="header">
                  <h2>Hero Overview</h2>
                </div>
              </div>
            </row>
            <HeroOverview 
            profileData={profileData.segments}
            realm={"competitive"}/>
          </div>

          <GraphDetail 
          legends={getLegends(profileData.segments)}/>
        </Layout>
    );
}