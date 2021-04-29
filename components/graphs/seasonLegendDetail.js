import React, {Component} from 'react';
import GraphLine from './graphLine'
import BtnGraph from './btnGraph'
import SeasonLegendCard from './seasonLegendCard'

export default class GraphSeasonOverview extends Component {
    state = {
        options: [],
        index: 0,
        legends: []
    }

    getStatCount = (stats) => {
        let counter = 0;
        if(stats.seasonWins != undefined) 
          counter++;
        if(stats.season2Wins != undefined) 
          counter++;
        if(stats.season3Wins != undefined) 
          counter++;
        if(stats.season4Wins != undefined) 
          counter++;
        if(stats.season5Wins != undefined) 
          counter++;
        if(stats.season6Wins != undefined) 
          counter++;
        if(stats.season7Wins != undefined) 
          counter++;
        if(stats.season8Wins != undefined) 
          counter++;
        if(stats.seasonKills != undefined) 
          counter++;
        if(stats.season2Kills != undefined) 
          counter++;
        if(stats.season3Kills != undefined) 
          counter++;
        if(stats.season4Kills != undefined) 
          counter++;
        if(stats.season5Kills != undefined) 
          counter++;
        if(stats.season6Kills != undefined) 
          counter++;
        if(stats.season7Kills != undefined) 
          counter++;
        if(stats.season8Kills != undefined) 
          counter++;
      
        return counter;
      }

    getLegends = (legendsData) => {
        const legends = legendsData.filter(data => data.type == "legend"  && data.metadata != undefined
                                                                    && data.stats != undefined
                                                                    && data.metadata.name != undefined
                                                                    && data.metadata.imageUrl != undefined
                                                                    && this.getStatCount(data.stats));
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

    renderOptions = () => {
      return this.state.options.map((option, index) => {
        return (
          <option key={index} value={index}>{option.display}</option>
        )
      })
    }

    handleIndex = (e) => {
      this.setState({
          index: e.target.value
      })
  }

    renderLegendCard = (legends) => {
      if(legends.length > 0) {
        return (
          <div className="row">
            <div className="col-12">
                  <select className="select-character" onChange={this.handleIndex}>
                    {this.renderOptions()}
                  </select> 
                </div>
                
                <div className="col-12">
                    <SeasonLegendCard 
                    legend={this.state.legends[this.state.index]}/>
                </div>
            </div>
        )
      } else {
        return null;
      }
    }

    componentDidMount() {
        this.setOptions(this.getLegends(this.props.profileData));
    }

    render() {
        return (  
          <> 
            {this.renderLegendCard(this.getLegends(this.props.profileData))}
          </>
        )
    }
}