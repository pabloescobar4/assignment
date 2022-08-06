import React, { useState } from 'react';
import { Chart } from './barchart';
import axios from 'axios';
import { useEffect } from 'react';
const LandingPage = (props) => {
  const [location, setLocation] = useState('');
  const [data, setData] = useState({});
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const key = '0c31f74bbe9ee72fecbc8d7eb51c24fa';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;
  const dailytemp_url = `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${key}`;
  const oneCallurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutelyalerts&units=metric&appid=${key}`;

  const getData = async (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        console.log(response.data);
        setData(response.data);
      });
      setLocation('');
    }
  };

  const handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Please Enable your Location in your browser!');
    }
  };

  const mapDataToWeatherInterface = (data) => {
    const mapped = {
      date: data.dt * 1000, // convert from seconds to milliseconds
      description: data.weather[0].main,
      temperature: Math.round(data.main.temp),
      name: data.name,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
    };

    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }

    return mapped;
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      //console.log(position.coords.latitude,position.coords.longitude)
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    getWeather(lat, long)
      .then((weather) => {
        setWeatherData(weather);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });

    // getForecast(lat, long)
    //   .then(data => {
    //     console.log(data);
    // 	setForecast(data);
    // 	setError(null);
    //   })
    //   .catch(err => {
    // 	setError(err.message);
    //   });
  }, [lat, long, error]);

  const getWeather = (lat, long) => {
    return fetch(dailytemp_url)
      .then((res) => handleResponse(res))
      .then((weather) => {
        if (Object.entries(weather).length) {
          const mappedData = mapDataToWeatherInterface(weather);
          return mappedData;
        }
      });
  };
  function getForecast(lat, long) {
    return axios
      .get(oneCallurl)
      .then((res) => console.log(res))
      .then((forecastData) => {
        if (Object.entries(forecastData).length) {
          return forecastData.list
            .filter((forecast) => forecast.dt_txt.match(/09:00:00/))
            .map(mapDataToWeatherInterface);
        }
      });
  }

  return (
    <div className="LandingPage">
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyPress={getData}
      />
      <button onClick={getData}>Search</button>
      <Chart data={data} weatherData={weatherData} loading={loading} /> 
    </div>
  );
};

export default LandingPage;
