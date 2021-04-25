import React, {Component} from 'react';
import GraphLine from '../graphs/graphLine'
import BtnGraph from '../graphs/btnGraph'
import HeroOverviewCard from './heroOverviewCard'

export default class HeroOverview extends Component {
    state = {
        options: [],
        index: 0,
        legends: []
    }

    getStatCount = (stats) => {
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

    getLegends = (datas) => {
      const legends = datas.filter(data => data.type == "hero" && data.attributes.realm == this.props.realm && data.metadata !== undefined
                                                                  && data.stats !== undefined
                                                                  && this.getStatCount(data.stats) > 0);
      return legends;
    }

      setOptions = (legendsData) => {
        this.setState({
            options: legendsData.map((legend, index) => {
                return {
                    display: legend.metadata.name,
                    value: index
                }
            }),
            legends: legendsData
        })
    }

    handleIndex = (e) => {
        this.setState({
            index: e.target.value
        })
    }

    renderOptions = () => {
      return this.state.options.map((option, index) => {
        return (
          <option key={index} value={index}>{option.display}</option>
        )
      })
    }

    componentDidMount() {
        this.setOptions(this.getLegends(this.props.profileData));
    }

    render() {
        return (   
            <div className="row">
                <div className="col-12">
                  <select className="select-character" onChange={this.handleIndex}>
                    {this.renderOptions()}
                  </select> 
                </div>
                
                <div className="col-12">
                    <HeroOverviewCard 
                    hero={this.state.legends[this.state.index]}/>
                </div>
            </div>
        )
    }
}