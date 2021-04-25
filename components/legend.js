export default function Legend(props){
    if(props.top.image) {
        return (   
            <div className="container-graph-top-legend">
                <img src={props.top.image} alt="img" height={120}/>
                <div className="container-graph-top-detail">
                <h3>Top Legend</h3>
                <h3>{props.top.name}</h3>
                <p>{getTopStat(props.top.filter)}: {props.top.value}</p>
                </div>
            </div>
        )
    } else {
        return (   
            <div className="container-graph-top-legend">
                <div className="container-graph-top-detail">
                <h3>Top Legend</h3>
                <h3>{props.top.name}</h3>
                <p>{getTopStat(props.top.filter)}: {props.top.value}</p>
                </div>
            </div>
        )
    }
    
}

const getTopStat = (filter) => {
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
        case "wins":
            return "Victories";
        case "mostEliminations":
            return "Most Eliminations";
        case "mostFinalBlows":
            return "Most Final Blows";
        case "mostDamageDone":
            return "Most Damage";
    }
}