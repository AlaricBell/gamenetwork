import Layout from '../../../components/layout/layout-main';
import { getAllApexMatchesId, getOverallApexProfileData } from '../../../lib/profiles';
import ProfileHeader from '../../../components/profile/profileHeader';
import MatchHistory from '../../../components/profile/matchHistory';

import { parseISO, format } from 'date-fns'


export async function getStaticPaths() {
    const paths = await getAllApexMatchesId();

    return {
      paths,
      fallback: false
    }
}

export async function getStaticProps({ params }) {
    const profileData = await getOverallApexProfileData(params.id)
    return {
      props: {
        profileData,
        profileId: params.id
      }
    }
}

const getmatchDateInterval = (profileData) => {
    let {0 : lastMatch,
         [profileData.matchHistory.items.length - 1]: firstMatch} = profileData.matchHistory.items;

    const date1 = new Date(firstMatch.metadata.endDate.value.replace("T", " "));
    const date2 = new Date(lastMatch.metadata.endDate.value.replace("T", " "));

    return date1.getFullYear() + "." + date1.getMonth() + "." + date1.getDate() + " - " +
            date2.getFullYear() + "." + date2.getMonth() + "." + date2.getDate();
}

export default function Playstation({profileData, profileId}) {
    return (
        <Layout> 
          <ProfileHeader 
          data={profileData}
          profileId={profileId}/>

          <div className="container pb-4 mt-4">
            <div className="container-match-header">
                <h4>Match history</h4>
                <div className="match-header-data">
                    <p>Total {profileData.matchHistory.items.length} matches</p>
                    <p className="match-header-date">{getmatchDateInterval(profileData)}</p>
                </div>
            </div>
            {profileData.matchHistory.items.map(match => (
                <MatchHistory 
                matchData={match}/>
            ))}
          </div>
        </Layout>
    );
}