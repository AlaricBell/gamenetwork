import Layout from '../../components/layout/layout-main';
import { getAllProfileId, getOverallProfileData } from '../../lib/profiles';
import Link from 'next/link';
import connect from '../../database/dbConnect';
import Image from 'next/image';
import GraphDetail from '../../components/graphDetail';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlaystation        
} from "@fortawesome/free-brands-svg-icons";
import { 
  faEye      
} from "@fortawesome/free-regular-svg-icons";
import { 
  faGlobe        
} from "@fortawesome/free-solid-svg-icons";

export async function getStaticPaths() {
    //const paths = getAllProfileId()
    connect();
    const profiles = await getAllProfileId();
    const paths = profiles.map(profile => `/playstation/${profile._id}`);

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

const getLegends = (data) => {
  const legends = data.filter(data => data.type == "legend" && data.stats.matchesPlayed != undefined 
                                                            && data.stats.damage != undefined
                                                            && data.stats.kills != undefined);
  return legends;
}

const getHeadshots = (headshots) => {
  if(!headshots) {
    return {
      displayName: "Headshots",
      displayValue: "0",
      rank: "unranked"
    }
  }
  return headshots;
}

const percentage = (context) => {
  return (100 - context).toPrecision(1);
}

export default function Playstation({profileData}) {
    return (
        <Layout>
          <div className="col-12 container-profile-background p-0">

          </div>
          <div className="container-fluid container-profile-bg">
            <div className="container container-profile-main">
              <Image 
                className="avatar"
                src={profileData.platformInfo.avatarUrl}
                alt="Profile avatar"
                width={100}
                height={100}/>
              
              <div className="container-profile-menu menu-left">
                <h2><FontAwesomeIcon icon={faPlaystation} style={{width: '30px', height: '30px'}}/>{profileData.platformInfo.platformUserId}</h2>
                <div className="menu-items menu-items-left">
                  <Link href="#"><a>Overview</a></Link>
                  <Link href="#"><a>Matches</a></Link>
                  <Link href="#"><a>Statistics</a></Link>
                </div>
              </div>

              <div className="container-profile-menu menu-right">
                <h2><FontAwesomeIcon icon={faGlobe} style={{width: '30px', height: '30px'}}/>{profileData.userInfo.countryCode}</h2>
                <div className="menu-items menu-items-right">
                  <p><FontAwesomeIcon icon={faEye} style={{width: '15px', height: '15px'}}/>{profileData.userInfo.pageviews}</p>
                  <p><FontAwesomeIcon icon={faEye} style={{width: '15px', height: '15px'}}/>{profileData.userInfo.pageviews}</p>
                  <p><FontAwesomeIcon icon={faEye} style={{width: '15px', height: '15px'}}/>{profileData.userInfo.pageviews}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="container pb-4">
            <div className="col-12 container-avatar-header">
              <div id="overview">
                <h2>Profile Overview</h2>
                <p>Total matches: {profileData.segments[0].stats.matchesPlayed.value}</p>
              </div>
            </div>
            <div className="col-12 container-avatar">
              <div className="container-avatar-img">
                <Image 
                className="rank"
                src={profileData.segments[0].stats.rankScore.metadata.iconUrl}
                alt="Profile avatar"
                width={70}
                height={70}/>
              </div>
              <div className="container-avatar-info">
                <h4>{profileData.segments[0].stats.rankScore.metadata.rankName}</h4>
                <p>{profileData.segments[0].stats.rankScore.displayValue} RP</p>
                <p>#{profileData.segments[0].stats.rankScore.rank}</p>
              </div>
              
            </div>
            <div className="col-12 container-profile-season">
              <div className="row container-profile-stats">
                <div className="col-3 container-card-overview">
                  <div className="card-stat card-stat-highlight">
                    <div className="card-stat-line"></div>
                    <div className="card-stat-info">
                      <p>{profileData.segments[0].stats.level.displayName}</p>
                      <h5>{profileData.segments[0].stats.level.displayValue}</h5>
                      <p><small>Rank: {profileData.segments[0].stats.level.rank} - Top {percentage(profileData.segments[0].stats.level.percentile)}%</small></p>
                    </div>
                  </div>
                </div>
                <div className="col-3 container-card-overview">
                <div className="card-stat card-stat-highlight">
                  <div className="card-stat-line"></div>
                    <div className="card-stat-info">
                      <p>{profileData.segments[0].stats.kills.displayName}</p>
                      <h5>{profileData.segments[0].stats.kills.displayValue}</h5>
                      <p><small>Rank: {profileData.segments[0].stats.kills.rank} - Top {percentage(profileData.segments[0].stats.kills.percentile)}%</small></p>
                    </div>
                  </div>
                </div>
                <div className="col-3 container-card-overview">
                  <div className="card-stat card-stat-highlight">
                    <div className="card-stat-line"></div>
                      <div className="card-stat-info">
                        <p>{profileData.segments[0].stats.damage.displayName}</p>
                        <h5>{profileData.segments[0].stats.damage.displayValue}</h5>
                        <p><small>Rank: {profileData.segments[0].stats.damage.rank} - Top {percentage(profileData.segments[0].stats.level.percentile)}%</small></p>
                      </div>
                  </div>
                </div>
                <div className="col-3 container-card-overview">
                <div className="card-stat card-stat-highlight">
                <div className="card-stat-line"></div>
                    <div className="card-stat-info">
                    <p>{profileData.segments[0].stats.headshots.displayName}</p>
                      <h5>{profileData.segments[0].stats.headshots.displayValue}</h5>
                      <p><small>Rank: {profileData.segments[0].stats.headshots.rank} - Top {percentage(profileData.segments[0].stats.headshots.percentile)}%</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 container-profile-details">
              <div className="row container-profile-stats">
                <div className="col-3">
                <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
                <div className="col-3">
                <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="card-stat">
                  <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
                <div className="col-3">
                <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
              </div>

              <div className="row container-profile-stats">
                <div className="col-3">
                <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
                <div className="col-3">
                <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="card-stat">
                  <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
                <div className="col-3">
                <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
              </div>

              <div className="row container-profile-stats">
                <div className="col-3">
                <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
                <div className="col-3">
                <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="card-stat">
                  <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
                <div className="col-3">
                <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
              </div>

              <div className="row container-profile-stats">
                <div className="col-3">
                <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
                <div className="col-3">
                <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="card-stat">
                  <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
                <div className="col-3">
                <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{profileData.platformInfo.platformUserId}</p>
                    <h5>{profileData.platformInfo.platformUserId}</h5>
                    <p><small>{profileData.platformInfo.platformUserId}</small></p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  

          <div className="container pb-4">
          {getLegends(profileData.segments).map((legend, index) => {
            return(
              <div className="col-12 container-hero" key={index}>
                <div className="header">
                  <h2>{legend.metadata.name}</h2>
                  <p>Matches Played: <strong>{legend.stats.matchesPlayed.displayValue}</strong></p>
                </div>
                <div className="container-hero-info">
                  <Image 
                      className="rank"
                      src={legend.metadata.imageUrl}
                      alt="Profile avatar"
                      width={360}
                      height={360}/>
                  <div className="container-fluid p-0">
                    <div className="row">
                      <div className="col-4 container-hero-card">
                        <div className="card-stat">
                          <div className="card-stat-line"></div>
                            <div className="card-stat-info">
                              <p>{legend.stats.kills.displayName}</p>
                              <h5>{legend.stats.kills.displayValue}</h5>
                              <p><small>Rank: {legend.stats.kills.rank} - Top: {percentage(legend.stats.kills.percentile)}%</small></p>
                          </div>
                        </div>
                      </div>

                      <div className="col-4 container-hero-card">
                        <div className="card-stat">
                          <div className="card-stat-line"></div>
                            <div className="card-stat-info">
                              <p>{legend.stats.damage.displayName}</p>
                              <h5>{legend.stats.damage.displayValue}</h5>
                              <p><small>Rank: {legend.stats.damage.rank} - Top: {percentage(legend.stats.damage.percentile)}%</small></p>
                          </div>
                        </div>
                      </div>

                      <div className="col-4 container-hero-card">
                        <div className="card-stat">
                          <div className="card-stat-line"></div>
                            <div className="card-stat-info">
                              <p>{getHeadshots(legend.stats.headshots).displayName}</p>
                              <h5>{getHeadshots(legend.stats.headshots).displayValue}</h5>
                              <p><small>Rank: {getHeadshots(legend.stats.headshots).rank} - Top: {percentage(legend.stats.damage.percentile)}%</small></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4 container-hero-card">
                        <div className="card-stat">
                          <div className="card-stat-line"></div>
                            <div className="card-stat-info">
                            <p>{legend.stats.kills.displayName}</p>
                              <h5>{legend.stats.kills.displayValue}</h5>
                              <p><small>Rank: {legend.stats.kills.rank} - Top: {percentage(legend.stats.kills.percentile)}%</small></p>
                          </div>
                        </div>
                      </div>

                      <div className="col-4 container-hero-card">
                        <div className="card-stat">
                          <div className="card-stat-line"></div>
                            <div className="card-stat-info">
                            <p>{legend.stats.damage.displayName}</p>
                              <h5>{legend.stats.damage.displayValue}</h5>
                              <p><small>Rank: {legend.stats.damage.rank} - Top: {percentage(legend.stats.damage.percentile)}%</small></p>
                          </div>
                        </div>
                      </div>

                      <div className="col-4 container-hero-card">
                        <div className="card-stat">
                          <div className="card-stat-line"></div>
                            <div className="card-stat-info">
                            <p>{getHeadshots(legend.stats.headshots).displayName}</p>
                              <h5>{getHeadshots(legend.stats.headshots).displayValue}</h5>
                              <p><small>Rank: {getHeadshots(legend.stats.headshots).rank} - Top: {percentage(legend.stats.damage.percentile)}%</small></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4 container-hero-card">
                        <div className="card-stat">
                          <div className="card-stat-line"></div>
                            <div className="card-stat-info">
                            <p>{legend.stats.kills.displayName}</p>
                              <h5>{legend.stats.kills.displayValue}</h5>
                              <p><small>Rank: {legend.stats.kills.rank} - Top: {percentage(legend.stats.kills.percentile)}%</small></p>
                          </div>
                        </div>
                      </div>

                      <div className="col-4 container-hero-card">
                        <div className="card-stat">
                          <div className="card-stat-line"></div>
                            <div className="card-stat-info">
                            <p>{legend.stats.damage.displayName}</p>
                              <h5>{legend.stats.damage.displayValue}</h5>
                              <p><small>Rank: {legend.stats.damage.rank} - Top: {percentage(legend.stats.damage.percentile)}%</small></p>
                          </div>
                        </div>
                      </div>

                      <div className="col-4 container-hero-card">
                        <div className="card-stat">
                          <div className="card-stat-line"></div>
                            <div className="card-stat-info">
                            <p>{getHeadshots(legend.stats.headshots).displayName}</p>
                              <h5>{getHeadshots(legend.stats.headshots).displayValue}</h5>
                              <p><small>Rank: {getHeadshots(legend.stats.headshots).rank} - Top: {percentage(legend.stats.damage.percentile)}%</small></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })} 
          </div>

          <GraphDetail 
          legends={getLegends(profileData.segments)}/>
        </Layout>
    );
}