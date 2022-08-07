import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import CircularIndeterminate from './CircularIndeterminate';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};



export function Chart(props) {

  const { weatherData, loading ,forecast,Data,searchLoading} = props;
  const labels = ['09', '10', '11', '12', '13', '14','15','16','09', '10', '11', '12', '13', '14','15','16','09', '10', '11', '12', '13', '14','15','16'];
 //const temp = ['11','31']
 const d = (forecast);
 console.log(d)
 const temp = d.map((element) =>
  (element.temp)
)
 //  console.log(tempq)
 //console.log(searchLoading)
  const data = {
    labels,
    datasets: [
      {
        
        label: 'Temprature',
        data: temp,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  //const ac = d.map((e) => e.temp)


  //	console.log(props)
  return (
    <>
      <div></div>
      {loading ? (
        <div>
          <CircularIndeterminate />
        </div>
      ) : (
        <div>
          <Line options={options} data={data} />
     
        <div>
          <div>
            <h1>{!searchLoading? weatherData.name:Data.name}</h1>
          </div>
          <div>
            <h1>{!searchLoading? weatherData.temperature:((Data.main.temp-273.15).toFixed(0))}° C</h1>
          </div>
          <div>
            <h1>{weatherData.description}</h1>
          </div>
          <p>{weatherData.pressure}</p>
          <p>{weatherData.humidity}%</p>
        </div>
      

</div>
      )}
    </>
  );
}
