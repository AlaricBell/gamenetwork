import Image from 'next/image'

const showCharacterStatForMatch = (matchData, filter) => {
    try {
        return (
            <div className="match-stat">
                <h5>{matchData.matches[0].stats[filter].displayName}</h5>
                <p>{matchData.matches[0].stats[filter].displayValue}</p>
            </div>
        )
    } catch {
        return null;
    }
}

const showMatchDuration = (matchData) => {
    try {
        return (
            <div className="match-stat">
                <h5>Duration</h5>
                <p>{matchData.metadata.duration.displayValue.substring(0, getDotIndex(matchData.metadata.duration.displayValue))}</p>
            </div>
        )
    } catch {
        return null;
    }
}

const showMatchDivision = (matchData) => {
    try {
        return (
            <div className="match-division">
                <img src={matchData.matches[0].stats.rankScore.metadata.rankScoreInfo.image} width={"50px"} height={"50px"}/>  
                <h5>{matchData.matches[0].stats.rankScore.metadata.rankScoreInfo.name}</h5>
            </div>
        )
    } catch {
        return null;
    }
}

const showMatchLegend = (matchData) => {
    try {
        return (
            <div className="match-legend">
                <Image src={matchData.matches[0].metadata.characterIconUrl.value} width={"100px"} height={"100px"}/>  
            </div>
        )
    } catch {
        return null;
    }
}

const getDotIndex = (str) => {
    if(str.indexOf('.') === -1) {
        return str.length
    }
    return str.indexOf('.');
}

const getTimeFromCurrent = (dateString) => {
    let currentDate = new Date();
    const matchDate = new Date(dateString.replace("T", " "))
    const elapsedMiliseconds = currentDate.getTime() - matchDate.getTime();
    const elapsedDays = Math.floor(elapsedMiliseconds / (1000 * 3600 * 24)); 
    const elapsedHours = Math.floor((elapsedMiliseconds / (1000 * 60 * 60)) % 24);
    if(elapsedDays > 0) {
        return elapsedDays.toString() + " " + "days ago"
    }
    return elapsedHours.toString() + " " + "hours ago";
}

export default function MatchHistory({matchData}) {
    return (
        <div className="card-match">
            <div className="match-header">
                <h5>{matchData.matches[0].metadata.characterIconUrl.displayValue}</h5>
                <p>{getTimeFromCurrent(matchData.matches[0].metadata.endDate.value)}</p>
            </div>
            <div className="match-content">
                {showMatchLegend(matchData)}
                {showMatchDivision(matchData)}
                <div className="match-stats">
                    {showMatchDuration(matchData)}
                    {showCharacterStatForMatch(matchData, "level")}
                    {showCharacterStatForMatch(matchData, "kills")}
                    {showCharacterStatForMatch(matchData, "damage")}
                    {showCharacterStatForMatch(matchData, "headshots")}
                    {showCharacterStatForMatch(matchData, "killsAsKillLeader")}
                    {showCharacterStatForMatch(matchData, "killsPerMatch")}
                </div>
            </div>
        </div>
    )
}