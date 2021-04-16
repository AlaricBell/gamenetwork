import {Component} from 'react';
import Image from 'next/image';

export default class CharacterCard extends Component {
    percentage = (context) => {
        return (100 - context).toPrecision(2);
    }

    showTotalMatchesForCharacter = (stats) => {
        try {
          return <p>Matches Played: <strong>{stats.matchesPlayed.displayValue}</strong></p>
        } catch(e) {
          return null;
        }
    }

    showTotalStatForCharacter = (stats, filter) => {
      try {
        return (
          <div className="col-lg-4 col-6 container-hero-card">
            <div className="card-stat">
              <div className="card-stat-line"></div>
              <div className="card-stat-info">
                <p>{stats[filter].displayName}</p>
                <h5>{stats[filter].displayValue}</h5>
                <p><small>Top: {this.percentage(stats[filter].percentile)}%</small></p>
              </div>
            </div>
          </div>
        )
      } catch(e) {
        return null;
      }
    }

    render() {
        return(
            <div className="col-12 container-hero">
              <div className="header">
                <h2>{this.props.metadata.name}</h2>
                {this.showTotalMatchesForCharacter(this.props.stats)}
              </div>
              <div className="container-hero-info">
                <img 
                    className="img-character"
                    src={this.props.metadata.imageUrl}
                    alt="Profile avatar"
                    width={320}
                    height={320}/>
                <div className="container-fluid p-0">
                  <div className="row">
                    {this.showTotalStatForCharacter(this.props.stats, 'kills')}
                    {this.showTotalStatForCharacter(this.props.stats, 'damage')}
                    {this.showTotalStatForCharacter(this.props.stats, 'headshots')}

                    {this.showTotalStatForCharacter(this.props.stats, 'winsWithFullSquad')}
                    {this.showTotalStatForCharacter(this.props.stats, 'killsAsKillLeader')}
                    {this.showTotalStatForCharacter(this.props.stats, 'timesPlacedtop3')}

                    
                    {this.showTotalStatForCharacter(this.props.stats, 'winningKills')}
                    {this.showTotalStatForCharacter(this.props.stats, 'killsPerMatch')}
                    {this.showTotalStatForCharacter(this.props.stats, 'tacticalMetersTeleported')}

                    {this.showTotalStatForCharacter(this.props.stats, 'stimDistanceTravelled')}
                    {this.showTotalStatForCharacter(this.props.stats, 'surveyBeaconsScanned')}
                    {this.showTotalStatForCharacter(this.props.stats, 'beastOfTheHuntKills')}

                    {this.showTotalStatForCharacter(this.props.stats, 'doubleTimeDistance')}
                    {this.showTotalStatForCharacter(this.props.stats, 'noxGassedEnemiesKilled')}
                    {this.showTotalStatForCharacter(this.props.stats, 'noxGasDamageDealt')}

                    {this.showTotalStatForCharacter(this.props.stats, 'eyeEnemiesScanned')}
                    {this.showTotalStatForCharacter(this.props.stats, 'eyeTrapsScanned')}
                    {this.showTotalStatForCharacter(this.props.stats, 'voicesWarningsHeard')}
                    
                    {this.showTotalStatForCharacter(this.props.stats, 'domeDamageBlocked')}

                    {this.showTotalStatForCharacter(this.props.stats, 'finishers')}
                    {this.showTotalStatForCharacter(this.props.stats, 'sniperKills')}
                    {this.showTotalStatForCharacter(this.props.stats, 'arKills')}

                    {this.showTotalStatForCharacter(this.props.stats, 'shotgunKills')}
                    {this.showTotalStatForCharacter(this.props.stats, 'pistolKills')}
                    {this.showTotalStatForCharacter(this.props.stats, 'carePackageKills')}

                    {this.showTotalStatForCharacter(this.props.stats, 'smgKills')}
                    {this.showTotalStatForCharacter(this.props.stats, 'lmgKills')}
                    {this.showTotalStatForCharacter(this.props.stats, 'revives')}
                  </div>
                </div>
              </div>
            </div>
          );
    }
}