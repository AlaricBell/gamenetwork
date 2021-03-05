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
        }
    }

    render() {
        return (   
            <div className="col-6 container-graph-top">
                {this.props.top.map((legend, index) => (
                    <div className="container-graph-top-legend" data-aos="fade-left">
                        <img src={legend.image} alt="img" height={120}/>
                        <div className="container-graph-top-detail">
                        <h3>{(index == 0)? "1st" : "2nd"}</h3>
                        <h3>{legend.name}</h3>
                        <p>{this.getTopStat(legend.filter)}: {legend.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}