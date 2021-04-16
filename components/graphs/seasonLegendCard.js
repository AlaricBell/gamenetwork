export default function SeasonLegendCard({legend}) {
    return (   
        <div className="card-season-legend">
            {showLegendImage(legend)}
            <div className="card-season-stats">
                {showLegendStat(legend, "seasonWins")}
                {showLegendStat(legend, "season2Wins")}
                {showLegendStat(legend, "season3Wins")}
                {showLegendStat(legend, "season4Wins")}
                {showLegendStat(legend, "season5Wins")}
                {showLegendStat(legend, "season6Wins")}
                {showLegendStat(legend, "season7Wins")}
                {showLegendStat(legend, "season8Wins")}
                {showLegendStat(legend, "seasonKills")}
                {showLegendStat(legend, "season2Kills")}
                {showLegendStat(legend, "season3Kills")}
                {showLegendStat(legend, "season4Kills")}
                {showLegendStat(legend, "season5Kills")}
                {showLegendStat(legend, "season6Kills")}
                {showLegendStat(legend, "season7Kills")}
                {showLegendStat(legend, "season8Kills")}
            </div>
            
        </div>
    )
}

const showLegendStat = (stats, filter) => {
    try {
      return (
        <div className="col-lg-4 col-6 container-hero-card">
          <div className="card-stat">
            <div className="card-stat-line"></div>
            <div className="card-stat-info">
              <p>{stats.stats[filter].displayName}</p>
              <h5>{stats.stats[filter].displayValue}</h5>
            </div>
          </div>
        </div>
      )
    } catch(e) {
      return null;
    }
  }

const showLegendImage = (legend) => {
    try {
        return <img src={legend.metadata.imageUrl} alt="legend avatar"/>
    }
    catch {
        return null;
    }
}