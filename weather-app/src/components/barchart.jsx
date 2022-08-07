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
    legend: {},
  },
};

export function Chart(props) {
  const { weatherData, loading, forecast, Data, searchLoading } = props;

  console.log(Data);
  const convert = (sec) => {
    var date = new Date(sec * 1000);
    var timestr = date.toLocaleTimeString();
    return timestr.slice(0, 5);
  };
  const temp = forecast.map((element) => element.temp);
  const time = forecast.map((element) => element.dt);
  const labels = time.map((e) => convert(e).slice(0, 2)).slice(0, 24);
  const data = {
    labels,
    datasets: [
      {
        label: 'Temprature',
        data: temp,
        fill: true,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <div></div>
      {loading ? (
        <div className="m-16 ml-48">
          <CircularIndeterminate />
        </div>
      ) : (
        <div>
          <div className=" border border-sky-500  w-48 flex p-5 m-10 drop-shadow-xl border-2 rounded-lg ">
            <div>
              <div className="text-xl font-bold">
                <h1>{!searchLoading ? weatherData.name : Data.name}</h1>
              </div>
              <div className="text-2xl font-bold">
                <p>
                  {!searchLoading
                    ? weatherData.temperature
                    : (Data.main.temp - 273.15).toFixed(0)}
                  ° C
                </p>
              </div>
              <div>
                <h1>
                  {!searchLoading
                    ? weatherData.description
                    : Data.weather[0].main}
                </h1>
              </div>
            </div>

            <div></div>
          </div>
          <Line options={options} data={data} />

          <div>
            <div className="text-bold  flex place-content-between mt-4 ">
              <div className="bg-blue-100 p-6 rounded-xl">
                <b>Pressure</b>
                <p>
                  {!searchLoading ? weatherData.pressure : Data.main.pressure}
                </p>
              </div>
              <div className="bg-blue-100 p-6 rounded-xl">
                <b>Humidity</b>
                <p>
                  {!searchLoading ? weatherData.humidity : Data.main.humidity}%
                </p>
              </div>
            </div>

            <div className="text-bold  flex place-content-between mt-4">
              <div className="bg-amber-300 p-7 rounded-xl">
                <b>Sunrise</b>
                <p>
                  {!searchLoading
                    ? convert(weatherData.sunrise)
                    : convert(Data.sys.sunrise)}
                </p>
              </div>
              <div className="bg-amber-300 p-8 rounded-xl">
                <b>Sunset</b>
                <p>
                  {!searchLoading
                    ? convert(weatherData.sunset)
                    : convert(Data.sys.sunset)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
