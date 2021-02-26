import React, {Component} from 'react';
import Graph from './graph';
import Legend from './legend';

export default class GraphDetail extends Component {
    state = {
        options: ["matchesPlayed", "kills", "damage"],
        currentOpt: "matchesPlayed",
        top: [
            {
                name: "",
                image: "",
                value: "",
                filter: "",
            },
            {
                name: "",
                image: "",
                value: "",
                filter: "",
            }
        ],
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
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
        }
    }

    getGraphData = (legends, filter) => {
        this.setState(prevState => {
            let data = Object.assign({}, prevState.data)
            data.labels = legends.map(legend => legend.metadata.name)
            data.datasets[0].data = legends.map(legend => legend.stats[filter].value);

            let top = Object.assign({}, prevState.top)
            const max = Math.max(...data.datasets[0].data);
            let legendsClone = [...legends];
            legendsClone = legendsClone.sort((legendA, legendB) => legendA.stats[filter].value < legendB.stats[filter].value ? 1 : -1);
            top[0].name = legendsClone[0].metadata.name;
            top[0].image = legendsClone[0].metadata.tallImageUrl;
            top[0].value = legendsClone[0].stats[filter].displayValue;
            top[0].filter = filter;
            top[1].name = legendsClone[1].metadata.name;
            top[1].image = legendsClone[1].metadata.tallImageUrl;
            top[1].value = legendsClone[1].stats[filter].displayValue;
            top[1].filter = filter;
            return {data, 
                    top,
                    currentOpt: filter};
        })
    }

    getLegendTop = (legends, filter) => {
        this.setState(prevState => {
            const data = legends.map(legend => legend.stats[filter].value);
            const max = Math.max(...data);
            const legend = legends.filter(legend => legend.stats[filter].value == max);
            return {legendImage: legend[0].metadata.tallImageUrl};
        })
    }

    componentDidMount() {
        this.getGraphData(this.props.legends, this.state.currentOpt); 
    }

    render() {
        return (
            <div className="container pb-4">
                <div className="row">
                    <Graph
                    data={this.state.data}/>

                    <div className="col-2 container-graph-buttons">
                        <div className="input-grp-graph">
                            <input type="radio" name="graph" value={this.state.options[0]} id="radio-match" onClick={() => this.getGraphData(this.props.legends, this.state.options[0])}/>
                            <label for="radio-match">Matches</label>
                        </div>
                        <div className="input-grp-graph">
                            <input type="radio" name="graph" value={this.state.options[1]} id="radio-kills" onClick={() => this.getGraphData(this.props.legends, this.state.options[1])}/>
                            <label for="radio-kills">Kills</label>
                        </div>
                        <div className="input-grp-graph">
                            <input type="radio" name="graph" value={this.state.options[2]} id="radio-damage" onClick={() => this.getGraphData(this.props.legends, this.state.options[2])}/>
                            <label for="radio-damage">Damage</label>
                        </div>        
                    </div>

                    <Legend
                    top={[this.state.top[0], this.state.top[1]]}/>
                </div>
            </div>
        )
    }
}