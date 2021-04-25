import {Component} from 'react';
import Image from 'next/image';

export default class OverwatchOverview extends Component {
    showTotalMatches = (data) => {
        try {
          if(data.matchesPlayed.value <= 0) {
            return null;
          } else {
            return <p>Total matches: {data.matchesPlayed.value}</p>
          }
        } catch(e) {
          return null;
        }
    }
      
    showOverviewCardHighlighted = (data, filter) => {
        try {
          return (
            <div className="col-6 col-lg-3 container-card-overview">
              <div className="card-stat card-stat-highlight">
                <div className="card-stat-line"></div>
                <div className="card-stat-info">
                  <p>{data.stats[filter].displayName}</p>
                  <h5>{data.stats[filter].displayValue}</h5>
                  {data.stats[filter].percentile === null ? null : <p><small>Top {this.props.percentage(data.stats[filter].percentile)}%</small></p>}
                </div>
              </div>
            </div>
          )
        } catch(e) {
          return null;
        }
    }
      
    showOverviewCard = (data, filter) => {
        try {
          return (
            <div className="col-6 col-lg-3">
              <div className="card-stat">
                <div className="card-stat-line"></div>
                  <div className="card-stat-info">
                    <p>{data.stats[filter].displayName}</p>
                    <h5>{data.stats[filter].displayValue}</h5>
                    {data.stats[filter].percentile === null ? null : <p><small>Top {this.props.percentage(data.stats[filter].percentile)}%</small></p>}
                 </div>
               </div>
            </div>
          )
        } catch(e) {
          return null;
        }
    }

    getRankPicture = (data) => {
        try {
          return (
            <div className="container-avatar-img">
              <Image 
              className="rank"
              src={data.stats.rankScore.metadata.iconUrl}
              alt="Profile avatar"
              width={70}
              height={70}/>
            </div>
          )
        } catch(e) {
          return null;
        }
    }

    render() {
        return (
            <div className="container pb-4">
                <div className="col-12 container-avatar-header">
                    <div id="overview">
                        <h2>Profile Overview</h2>
                        {this.showTotalMatches(this.props.profileData.stats)}
                    </div>
                </div>
                <div className="col-12 container-avatar">
                    {this.getRankPicture(this.props.profileData)}
                    <div className="container-avatar-info">
                        <h4>{this.props.profileData.metadata.name}</h4>
                    </div>
                </div>

                <div className="col-12 container-profile-season">
                    <div className="row container-profile-stats">
                        {this.showOverviewCardHighlighted(this.props.profileData, 'wins')}
                        {this.showOverviewCardHighlighted(this.props.profileData, 'cards')}
                        {this.showOverviewCardHighlighted(this.props.profileData, 'wlPercentage')}
                        {this.showOverviewCardHighlighted(this.props.profileData, 'medals')}
                    </div>
                </div>

                <div className="col-12 container-profile-details">
                    <div className="row container-profile-stats">
                        {this.showOverviewCard(this.props.profileData, 'timeSpentOnFire')}
                        {this.showOverviewCard(this.props.profileData, 'goldMedals')}
                        {this.showOverviewCard(this.props.profileData, 'silverMedals')}
                        {this.showOverviewCard(this.props.profileData, 'bornzeMedals')}
                        {this.showOverviewCard(this.props.profileData, 'multiKills')}
                        {this.showOverviewCard(this.props.profileData, 'soloKills')}
                        {this.showOverviewCard(this.props.profileData, 'objectiveKills')}
                        {this.showOverviewCard(this.props.profileData, 'environmentalKills')}
                        {this.showOverviewCard(this.props.profileData, 'finalBlows')}
                        {this.showOverviewCard(this.props.profileData, 'damageDone')}
                        {this.showOverviewCard(this.props.profileData, 'healingDone')}
                        {this.showOverviewCard(this.props.profileData, 'eliminations')}
                        {this.showOverviewCard(this.props.profileData, 'deaths')}
                        {this.showOverviewCard(this.props.profileData, 'kd')}
                        {this.showOverviewCard(this.props.profileData, 'kg')}
                        {this.showOverviewCard(this.props.profileData, 'objectiveTime')}
                        {this.showOverviewCard(this.props.profileData, 'defensiveAssists')}
                        {this.showOverviewCard(this.props.profileData, 'offensiveAssists')}
                        {this.showOverviewCard(this.props.profileData, 'mostEliminations')}
                        {this.showOverviewCard(this.props.profileData, 'mostFinalBlows')}
                        {this.showOverviewCard(this.props.profileData, 'mostDamageDone')}
                        {this.showOverviewCard(this.props.profileData, 'mostHealingDone')}
                        {this.showOverviewCard(this.props.profileData, 'mostDefensiveAssists')}
                        {this.showOverviewCard(this.props.profileData, 'mostOffensiveAssists')}
                        {this.showOverviewCard(this.props.profileData, 'mostObjectiveKills')}
                        {this.showOverviewCard(this.props.profileData, 'mostObjectiveTime')}
                        {this.showOverviewCard(this.props.profileData, 'mostSoloKills')}
                        {this.showOverviewCard(this.props.profileData, 'mostTimeSpentOnFire')}
                    </div>
                </div>
            </div>
        )
    }
}