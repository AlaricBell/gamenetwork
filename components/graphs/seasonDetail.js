import React, {useState, useEffect} from 'react';
import GraphLine from './graphLine'
import BtnGraph from './btnGraph'

export default function SeasonDetail({rank, data}) {
    return (   
        <>
            <img 
            src={rank.metadata.iconUrl}
            alt="season rank"/>
            <h5>{rank.metadata.rankName}</h5>
            <p><strong>Current Rank: {rank.rank}</strong></p>
            {data.labels.map((label, index) => {
                return (
                    <>
                        <hr />
                        <p><span>{label}:</span> {data.datasets[0].data[index]}</p>   
                    </>
                )
            })}
        </>
    )
}