import React, {Component} from 'react';
import GraphLine from './graphLine'
import BtnGraph from './btnGraph'
import SeasonDetail from './seasonDetail'

export default class GraphSeasonOverview extends Component {
    state = {
        options: [],
        currentOpt: "",
        data : {
            labels: [],
            datasets: [{
              data: [],
              backgroundColor: [
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(0, 255, 109, 0.2)',
              ],
              borderColor: [
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(0, 255, 109, 1)',
              ],
              borderWidth: 1
            }]
        }
    }

    getGraphData = (overview, filter) => {
        let seasonData = [];
        switch(filter) {
            case "wins":  
                if(overview.stats.seasonWins) {
                    seasonData.push(overview.stats.seasonWins);
                }
                if(overview.stats.season2Wins) {
                    seasonData.push(overview.stats.season2Wins);
                }
                if(overview.stats.season3Wins) {
                    seasonData.push(overview.stats.season3Wins);
                }
                if(overview.stats.season4Wins) {
                    seasonData.push(overview.stats.season4Wins);
                }
                if(overview.stats.season5Wins) {
                    seasonData.push(overview.stats.season5Wins);
                }
                if(overview.stats.season6Wins) {
                    seasonData.push(overview.stats.season6Wins);
                }
                if(overview.stats.season7Wins) {
                    seasonData.push(overview.stats.season7Wins);
                }
                if(overview.stats.season8Wins) {
                    seasonData.push(overview.stats.season8Wins);
                }
                break;
            case "kills":
                if(overview.stats.seasonKills) {
                    seasonData.push(overview.stats.seasonKills);
                }
                if(overview.stats.season2Kills) {
                    seasonData.push(overview.stats.season2Kills);
                }
                if(overview.stats.season3Kills) {
                    seasonData.push(overview.stats.season3Kills);
                }
                if(overview.stats.season4Kills) {
                    seasonData.push(overview.stats.season4Kills);
                }
                if(overview.stats.season5Kills) {
                    seasonData.push(overview.stats.season5Kills);
                }
                if(overview.stats.season6Kills) {
                    seasonData.push(overview.stats.season6Kills);
                }
                if(overview.stats.season7Kills) {
                    seasonData.push(overview.stats.season7Kills);
                }
                if(overview.stats.season8Kills) {
                    seasonData.push(overview.stats.season8Kills);
                }
                break;
        }


        this.setState(prevState => {
            let data = Object.assign({}, prevState.data)
            data.labels = seasonData.map(season => season.displayName.replace(" Wins", "").replace(" Kills", ""))
            data.datasets[0].data = seasonData.map(season => season.value);
            return {data,
                    currentOpt: filter};
        })
    }

    setOptions = (overview) => {
        let options = [];
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

        if(win) {
            options.push({value: "wins", display: "Victory"})
        }
        if(kills) {
            options.push({value: "kills", display: "Kills"})
        }
        this.setState({
            options,
        })
        return options[0].value;
    }

    componentDidMount() {
        this.getGraphData(this.props.overview, this.setOptions(this.props.overview)); 
    }

    render() {
        return (   
            <div className="row">
                <div className="col-12 p-0">
                    <BtnGraph 
                    options={this.state.options}
                    data={this.props.overview}
                    getGraphData={this.getGraphData}/>
                </div>
                <div className="col-md-6 col-12 container-season-graph mt-4"> 
                    <GraphLine
                    data={this.state.data}/>
                </div>
                <div className="col-md-6 col-12 container-season-detail mt-4"> 
                    <SeasonDetail
                    data={this.state.data}
                    rank={this.props.overview.stats.rankScore}/>
                </div>
            </div>
        )
    }
}