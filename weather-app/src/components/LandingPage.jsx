import React, { useState } from 'react';
import { Chart } from './barchart';
import axios  from 'axios'
import { useEffect } from 'react';
const LandingPage = (props) => {
  const [location, setLocation] = useState('');
  const [data,setData] = useState({});
 const [count,setCount] = useState(1)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0c31f74bbe9ee72fecbc8d7eb51c24fa`
  const dailytemp_url= ``

  const getData = async (event) => {
	if(event.key === "Enter"){
    axios.get(url).then((response) => {
		console.log(response.data);
		setData(response.data)
	})
	setLocation('')
}

  }
//   useEffect (() => {
// 	getData()
//   },[count])
//const converteData = data.main.temp
//const celsius = (converteData -32)/1.8

//console.log(celsius)
  return (
    <div className="LandingPage">
      <input 
	  value={location}
	  onChange={e => setLocation(e.target.value)}
	  onKeyPress={getData}
	  />
	  <button onClick={getData}>Search</button>
      <Chart data = {data}/> 
    </div>
  );
};

export default LandingPage;
