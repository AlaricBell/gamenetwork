import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import Graph from './graph';
import Legend from './legend';

export default class GraphDetail extends Component {
    state = {
        options: ["matchesPlayed", "kills", "damage"],
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
            return {data};
        })
    }

    componentDidMount() {
        this.getGraphData(this.props.legends, "matchesPlayed"); 
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
                    legends={this.props.legends}/>
                </div>
            </div>
        )
    }
}