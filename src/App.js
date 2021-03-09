import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core'
import axios from 'axios';
require('dotenv').config();

const App = () => {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});

  const onChange = (event) => {
    setCityName(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(cityName);
    const getWeatherData = async () => {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/api/bicycle-weather-01`, { cityName: cityName });
      if (response.data) {
        setWeather(response.data);
      }
      console.log(response);
    }
    getWeatherData();
  }

  return (
    <div className="App">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 60 }}>
            <div>
              {weather.name ?
                <h1>{weather.name}</h1>
                : null
              }
            </div>
            <div>
              {weather.weather ? weather.weather[0] ?
                <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather logo" />
                : null : null
              }
            </div>
            <div>
              {weather.weather ? weather.weather[0] ? `Weather: ${weather.weather[0].description}` : null : null}
            </div>
            <div>
              {weather.main ? `Temp: ${weather.main.temp} °C` : null}
            </div>
            <div>
              {weather.main ? `Feels like: ${weather.main.feels_like} °C` : null}
            </div>
            <div>
              {weather.wind ? `Wind speed: ${weather.wind.speed} m/s` : null}
            </div>
            <div>
              {weather.wind ? `Wind deg: ${weather.wind.deg} °` : null}
            </div>
            <div>
              {weather.snow ? weather.snow["1h"] ? `Snow: ${weather.snow["1h"]} mm/h` : null : null}
            </div>
            <div>
              {weather.rain ? weather.rain["1h"] ? `Rain: ${weather.rain} mm/h` : null : null}
            </div>
          </div>
          <form style={{ margin: 20, alignItems: "center", display: "flex", flexDirection: "column" }} onSubmit={onSubmit} >
            <TextField style={{ margin: 10 }} label="City name" variant="outlined" value={cityName} onChange={onChange} />
            <Button style={{ width: "100px" }} variant="contained" type="submit">Submit</Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
