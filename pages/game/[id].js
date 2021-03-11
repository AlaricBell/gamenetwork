import Layout from '../../components/layout/layout-main';
import { getAllProfileId, getOverallProfileData } from '../../lib/profiles';
import connect from '../../database/dbConnect';
import GraphDetail from '../../components/graphDetail';
import CharacterCard from '../../components/profile/characterCard';
import Overview from '../../components/profile/overview';
import ProfileHeader from '../../components/profile/profileHeader';


export async function getStaticPaths() {
    //const paths = getAllProfileId()
    connect();
    const profiles = await getAllProfileId();
    const paths = profiles.map(profile => `/game/${profile._id}`);

    return {
      paths,
      fallback: false
    }
}

export async function getStaticProps({ params }) {
    const profileData = await getOverallProfileData(params.id)
    return {
      props: {
        profileData
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
                                                              && getStatCount(data.stats) > 2);
  return legends;
}

export default function Playstation({profileData}) {
    return (
        <Layout> 
          <ProfileHeader 
          data={profileData}/>

          <Overview 
          profileData={profileData.segments[0]}
          percentage={percentage}/>

          <div className="container pb-4">
          {getLegends(profileData.segments).map((legend, index) => {
            return (
            <CharacterCard 
            stats={legend.stats}
            metadata={legend.metadata}
            key={index}/>
            )
          })} 
          </div>

          <GraphDetail 
          legends={getLegends(profileData.segments)}/>
        </Layout>
    );
}