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

const labels = ['09', '10', '11', '12', '13', '14'];
const temp = [10, 20, 29, 40, 35, 32];
const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Temprature',
      data: temp,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function Chart(props) {
  const { weatherData, loading } = props;

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
            <h1>{weatherData.name}</h1>
          </div>
          <div>
            <h1>{weatherData.temperature}</h1>
          </div>
          <div>
            <h1>{weatherData.description}</h1>
          </div>
          <p>{weatherData.pressure}</p>
          <p>{weatherData.humidity}%</p>
        </div>
      )}
    </>
  );
}
