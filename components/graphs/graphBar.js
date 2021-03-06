import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

export default class Graph extends Component {

    render() {
        return (   
            <div className="col-md-4 col-12"> 
                <Bar
                data={this.props.data}
                width={100}
                height={100}
                options={{
                    maintainAspectRatio: true,
                    legend: {
                    display: false,
                    },
                }}/>
            </div>
        )
    }
}