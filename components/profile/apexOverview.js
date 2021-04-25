import {Component} from 'react';
import Image from 'next/image';

export default class ApexOverview extends Component {
    showTotalMatches = (data) => {
        try {
          return <p>Total matches: {data.matchesPlayed.value}</p>
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
                  <p><small>Top {this.props.percentage(data.stats[filter].percentile)}%</small></p>
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
                    <p><small>Top {this.props.percentage(data.stats[filter].percentile)}%</small></p>
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
                        <h4>{this.props.profileData.stats.rankScore.metadata.rankName}</h4>
                        <p>{this.props.profileData.stats.rankScore.displayValue} RP</p>
                        <p>#{this.props.profileData.stats.rankScore.rank}</p>
                    </div>
                </div>

                <div className="col-12 container-profile-season">
                    <div className="row container-profile-stats">
                        {this.showOverviewCardHighlighted(this.props.profileData, 'level')}
                        {this.showOverviewCardHighlighted(this.props.profileData, 'kills')}
                        {this.showOverviewCardHighlighted(this.props.profileData, 'damage')}
                        {this.showOverviewCardHighlighted(this.props.profileData, 'headshots')}
                    </div>
                </div>

                <div className="col-12 container-profile-details">
                    <div className="row container-profile-stats">
                        {this.showOverviewCard(this.props.profileData, 'killsPerMatch')}
                        {this.showOverviewCard(this.props.profileData, 'damagePerMatch')}
                        {this.showOverviewCard(this.props.profileData, 'killsAsKillLeader')}
                        {this.showOverviewCard(this.props.profileData, 'winsWithFullSquad')}
                        {this.showOverviewCard(this.props.profileData, 'timesPlacedtop3')}
                        {this.showOverviewCard(this.props.profileData, 'smgKills')}
                        {this.showOverviewCard(this.props.profileData, 'arKills')}
                        {this.showOverviewCard(this.props.profileData, 'pistolKills')}
                        {this.showOverviewCard(this.props.profileData, 'sniperKills')}
                        {this.showOverviewCard(this.props.profileData, 'shotgunKills')}
                        {this.showOverviewCard(this.props.profileData, 'lmgKills')}
                        {this.showOverviewCard(this.props.profileData, 'carePackageKills')}
                        {this.showOverviewCard(this.props.profileData, 'revives')}
                        {this.showOverviewCard(this.props.profileData, 'finishers')}
                        {this.showOverviewCard(this.props.profileData, 'seasonWins')}
                        {this.showOverviewCard(this.props.profileData, 'season2Wins')}
                        {this.showOverviewCard(this.props.profileData, 'season3Wins')}
                        {this.showOverviewCard(this.props.profileData, 'season4Wins')}
                        {this.showOverviewCard(this.props.profileData, 'season5Wins')}
                        {this.showOverviewCard(this.props.profileData, 'season6Wins')}
                        {this.showOverviewCard(this.props.profileData, 'season7Wins')}
                        {this.showOverviewCard(this.props.profileData, 'season8Wins')}
                    </div>
                </div>
            </div>
        )
    }
}