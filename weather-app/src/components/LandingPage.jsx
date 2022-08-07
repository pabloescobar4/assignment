import React, { useState } from 'react';
import { Chart } from './barchart';
import { useEffect } from 'react';
import axios from 'axios';
const LandingPage = (props) => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [data, setData] = useState({});
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const key = 'a8937c07459e87c8f5dbd0b8822cbdd6';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;
  const dailytemp_url = `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${key}`;
  const oneCallurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutelyalerts&units=metric&appid=${key}`;

  const getData = async (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        console.log(response);
        setData(response.data);
        setSearchLoading(!searchLoading);
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
      date: data.dt * 1000,
      description: data.weather[0].main,
      temperature: Math.round(data.main.temp),
      name: data.name,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    };

    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }

    return mapped;
  };

  const getWeather = async (lat, long) => {
    return fetch(dailytemp_url)
      .then((res) => handleResponse(res))
      .then((weather) => {
        if (Object.entries(weather).length) {
          const mappedData = mapDataToWeatherInterface(weather);
          return mappedData;
        }
      });
  };

  const getForecast = async (lat, long) => {
    return fetch(oneCallurl)
      .then((response) => handleResponse(response))
      .then((forecastData) => {
        if (Object.entries(forecastData).length) {
          setForecast(forecastData.hourly);
         
          forecastData.hourly.map((e) => e.temp);
        }
      });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
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
    getForecast(lat, long);
  }, [lat, long, error]);

  return (
    <div className="mt-4">
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyPress={getData}
        placeholder="Enter City Name and press Enter"
        className="border rounded-lg p-4 w-96 ml-10 drop-shadow-md outline-none"
      />
      <Chart
        Data={data}
        weatherData={weatherData}
        searchLoading={searchLoading}
        loading={loading}
        forecast={forecast}
      />
    </div>
  );
};

export default LandingPage;
