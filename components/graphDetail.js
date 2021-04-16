import React, {Component} from 'react';
import Graph from './graph';
import Legend from './legend';
import BtnGraph from './graphs/btnGraph';

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

    renderFilterOptions = (legends, option, index, getGraphData) => {
        return (
            <button className="button-graph" key={index} onClick={() => getGraphData(legends, option.value)}>{option.value}</button>
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

                    <div className="col-md-8 col-12 container-graph-control">
                        <BtnGraph 
                        options={this.state.options}
                        data={this.props.legends}
                        getGraphData={this.getGraphData}/>

                        <Legend
                        top={this.state.top}/>
                    </div>
                </div>
            </div>
        )
    }
}