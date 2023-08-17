
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country, weatherApiKey }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${weatherApiKey}`)
        .then(response => {
            setWeatherData(response.data);
        });
    }, [country.capital[0]]);

return (
    <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}<br></br>area {country.area}</p>
        <h4>languages:</h4>
        <ul>
        {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
        ))}
        </ul>
        <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        width="200"
        />
        
        {weatherData && (
            <div>
            <h3>Weather in {country.capital[0]}</h3>
            <p>temperature {weatherData.main.temp} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt ={weatherData.weather[0].desctiption} />
            <p>wind {weatherData.main.wind} m/s</p>
            </div>
        )
        }
    </div>
    )
}

export default Country