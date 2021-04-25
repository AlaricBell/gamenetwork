export default function HeroOverviewCard({hero}) {
  return (   
      <div className="card-season-legend">
          <div className="card-season-stats">
              {showHeroStat(hero, "timePlayed")}
              {showHeroStat(hero, "wins")}
              {showHeroStat(hero, "matchesPlayed")}
              {showHeroStat(hero, "timeSpentOnFire")}
              {showHeroStat(hero, "cards")}
              {showHeroStat(hero, "wlPercentage")}
              {showHeroStat(hero, "medals")}
              {showHeroStat(hero, "goldMedals")}
              {showHeroStat(hero, "silverMedals")}
              {showHeroStat(hero, "bornzeMedals")}
              {showHeroStat(hero, "multiKills")}
              {showHeroStat(hero, "soloKills")}
              {showHeroStat(hero, "objectiveKills")}
              {showHeroStat(hero, "environmentalKills")}
              {showHeroStat(hero, "finalBlows")}
              {showHeroStat(hero, "damageDone")}
              {showHeroStat(hero, "healingDone")}
              {showHeroStat(hero, "eliminations")}
              {showHeroStat(hero, "deaths")}
              {showHeroStat(hero, "kd")}
              {showHeroStat(hero, "kg")}
              {showHeroStat(hero, "objectiveTime")}
              {showHeroStat(hero, "defensiveAssists")}
              {showHeroStat(hero, "offensiveAssists")}
              {showHeroStat(hero, "mostEliminations")}
              {showHeroStat(hero, "mostFinalBlows")}
              {showHeroStat(hero, "mostDamageDone")}
              {showHeroStat(hero, "mostHealingDone")}
              {showHeroStat(hero, "mostDefensiveAssists")}
              {showHeroStat(hero, "mostOffensiveAssists")}
              {showHeroStat(hero, "mostObjectiveKills")}
              {showHeroStat(hero, "mostObjectiveTime")}
              {showHeroStat(hero, "mostSoloKills")}
              {showHeroStat(hero, "mostTimeSpentOnFire")}
          </div>
      </div>
  )
}

const showHeroStat = (data, filter) => {
  try {
    if(data.stats[filter].displayValue > 0) {
      return (
        <div className="col-lg-4 col-6 container-hero-card">
          <div className="card-stat">
            <div className="card-stat-line"></div>
            <div className="card-stat-info">
              <p>{data.stats[filter].displayName}</p>
              <h5>{data.stats[filter].displayValue}</h5>
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
    
  } catch(e) {
    return null;
  }
}