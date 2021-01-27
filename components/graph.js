import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

export default class Graph extends Component {
    state = {
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
        this.getGraphData(this.props.legends, "damage"); 
    }

    render() {
        return (
            <div className="container pb-4">
                <div className="col-4"> 
                    <Bar
                    data={this.state.data}
                    width={100}
                    height={100}
                    options={{
                        maintainAspectRatio: true,
                        legend: {
                        display: false,
                        },
                    }}
                        />
                </div>
            </div>
        )
    }
}