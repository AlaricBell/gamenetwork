import {Line} from 'react-chartjs-2';

export default function Graph({data}) {
    return (
            <Line
            data={data}
            height={100}
            width={100}
            options={{
                maintainAspectRatio: true,
                legend: {
                display: false,
                },
            }}/>
    )
}