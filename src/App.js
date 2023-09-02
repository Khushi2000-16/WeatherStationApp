import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const apiKey = 'f0d9f169c129c4f229e5d219b0d31680';
 

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
      axios.get(url).then((response) => {
        const celsiusTemp = response.data.main.temp - 273.15; // Convert from Kelvin to Celsius
        response.data.main.temp = celsiusTemp;
        setData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });

      setLocation('');
    }
  }


  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.temp.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

      </div>
      
    </div>
     
  );
}

export default App;


 