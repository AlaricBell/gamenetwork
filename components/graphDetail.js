import React, {Component} from 'react';
import Graph from './graph';
import Legend from './legend';

export default class GraphDetail extends Component {
    state = {
        options: [],
        currentOpt: "",
        top: {
                name: "",
                image: "",
                value: "",
                filter: "",
            },
        data : {
            labels: [],
            datasets: [{
              data: [],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(0, 255, 109, 0.2)',
                'rgba(242, 5, 5, 0.2)',
                'rgba(217, 208, 199, 0.2)',
                'rgba(43, 28, 140, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(0, 255, 109, 1)',
                'rgba(242, 5, 5, 1)',
                'rgba(217, 208, 199, 1)',
                'rgba(43, 28, 140, 1)',
              ],
              borderWidth: 1
            }]
        }
    }

    getGraphData = (legends, filter) => {
        legends = legends.filter(legend => legend.stats[filter]);
        this.setState(prevState => {
            let data = Object.assign({}, prevState.data)
            data.labels = legends.map(legend => legend.metadata.name)
            data.datasets[0].data = legends.map(legend => legend.stats[filter].value);

            let top = Object.assign({}, prevState.top)
            let legendsClone = [...legends];
            legendsClone = legendsClone.sort((legendA, legendB) => legendA.stats[filter].value < legendB.stats[filter].value ? 1 : -1);
            top.name = legendsClone[0].metadata.name;
            top.image = legendsClone[0].metadata.tallImageUrl;
            top.value = legendsClone[0].stats[filter].displayValue;
            top.filter = filter;
            return {data,
                    top,
                    currentOpt: filter};
        })
    }

    renderFilterOptions = (legends, option) => {
        return (
            <div className="input-grp-graph">
                <input type="radio" name="graph" value={option.value} id="radio-match" onClick={() => this.getGraphData(legends, option.value)}/>
                <label for="radio-match">{option.display}</label>
            </div>
        )
    }

    setOptions = (legends) => {
        let options = [];
        let matches, kills, damage, killsPerMatch, headshots = false;
        legends.forEach(legend => {
            if(legend.stats.matchesPlayed){
                matches = true;
            }
            if(legend.stats.damage){
                damage = true;
            }
            if(legend.stats.kills){
                kills = true
            }
            if(legend.stats.killsPerMatch){
                killsPerMatch = true
            }
            if(legend.stats.headshots){
                headshots = true
            }
        })

        if(matches) {
            options.push({value: "matchesPlayed", display: "Matches"})
        }
        if(damage) {
            options.push({value: "damage", display: "Damage"})
        }
        if(kills) {
            options.push({value: "kills", display: "Kills"})
        }
        if(killsPerMatch) {
            options.push({value: "killsPerMatch", display: "Average kills"})
        }
        if(headshots) {
            options.push({value: "headshots", display: "Headshots"})
        }
        this.setState({
            options,
        })
        return options[0].value;
    }

    componentDidMount() {
        this.getGraphData(this.props.legends, this.setOptions(this.props.legends)); 
    }

    render() {
        return (
            <div className="container pb-4">
                <div className="row">
                    <Graph
                    data={this.state.data}/>

                    <div className="col-2 container-graph-buttons">
                        {this.state.options.map(option => (
                            this.renderFilterOptions(this.props.legends, option)
                        ))}
                    </div>

                    <Legend
                    top={this.state.top}/>
                </div>
            </div>
        )
    }
}