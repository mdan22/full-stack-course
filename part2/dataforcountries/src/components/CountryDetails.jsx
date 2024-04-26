import { useState, useEffect } from 'react';
import axios from 'axios';

// The CountryDetails component receives a country object as a prop and displays the details of the country
const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  // Fetch weather data for the country's capital
  useEffect(() => {
    const apiKey = import.meta.env.VITE_SOME_KEY // variable api_key now has the value set in startup
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`;

    console.log('fetching weather data...');
    axios
      .get(apiUrl)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, [country.capital]);

  // Display the country's details and weather data
  return (
    <div>
      <h1>{country.name.common}</h1>
      <ul>          
        <li>capital {country.capital}</li>
        <li>area {country.area}</li>
      </ul>
      <h3>languages:</h3>
      <ul>          
        {Object.keys(country.languages).map(languageCode => (
          <li key={languageCode}>{country.languages[languageCode]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital}</h2>
      {weather && (
        <ul>
          <li>temperature {weather.main.temp} Celsius</li>
          {weather.weather.map(condition => (
              <img key={condition.id}
                src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
                alt={condition.description}
              />
          ))}
          <li>wind {weather.wind.speed} m/s</li>
        </ul>
      )}
    </div>
  );
};

export default CountryDetails;
