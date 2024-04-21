import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // skip if value only contains spaces
    if (value.trim !== '') {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          // Filter countries based on the input value
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(value.toLowerCase())
          )
          if(filteredCountries.length > 10) {
            setCountries([])
            setShowMessage(true)
          }
          else {
            setCountries(filteredCountries)
            setShowMessage(false)
          }
        })
        .catch( error => {
          console.error('Error fetching countries:', error)
          setCountries([]) // clear countries if there's an error
      })
    }
    else {
      setCountries([]) // clear countries if the input field is empty
    }

  }, [value]) // useEffect is called every time value changes

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        find countries <input value={value} onChange={handleChange} />
      </form>
      {showMessage && <p>Too many matches, specify another filter</p>}
      {countries.length > 1 && countries.length < 11 && (
        <ul>
          {countries.map(country => (
            <li key={country.flag}>{country.name.common}</li>
          ))}
        </ul>
      )
      }
      {countries.length === 1 && (
        <div>
          <h1>{countries[0].name.common}</h1>
          <ul>          
            <li>capital {countries[0].capital}</li>
            <li>area {countries[0].area}</li>
          </ul>
          <h2>languages:</h2>
          <ul>          
          {Object.keys(countries[0].languages).map(languageCode => (
            <li key={languageCode}>{countries[0].languages[languageCode]}</li>
          ))}
          </ul>
          <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
        </div>
      )}
    </div>
  )
}

export default App