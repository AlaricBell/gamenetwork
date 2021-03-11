import React, {Component} from 'react';

export default class Legend extends Component {
    getTopStat = (filter) => {
        switch(filter){
            case "matchesPlayed":
                return "Matches";
            case "kills":
                return "Kill";
            case "damage":
                return "Damage";
            case "killsPerMatch":
                return "Average kills";
            case "headshots":
                return "Headshots";

        }
    }

    render() {
        return (   
            <div className="col-6 container-graph-top">
                    <div className="container-graph-top-legend">
                        <img src={this.props.top.image} alt="img" height={120}/>
                        <div className="container-graph-top-detail">
                        <h3>Top Legend</h3>
                        <h3>{this.props.top.name}</h3>
                        <p>{this.getTopStat(this.props.top.filter)}: {this.props.top.value}</p>
                        </div>
                    </div>
            </div>
        )
    }
}