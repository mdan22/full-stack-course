import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [showMessage, setShowMessage] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)

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
    setSelectedCountry(null)  // clear selected country when input changes
  }

  const handleClick = (country) => {
    setSelectedCountry(country)
    setValue(country.name.common)

  }

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        find countries <input value={value} onChange={handleChange} />
      </form>
      {showMessage && <p>Too many matches, specify another filter</p>}
      { !selectedCountry && countries.length > 1 && countries.length < 11 && (
        <ul>
          {countries.map(country => (
            <li key={country.flag}>{country.name.common}<button onClick={() => handleClick(country)}>show</button></li>
          ))}
        </ul>
      )
      }
      {selectedCountry && <CountryDetails country={selectedCountry} />}
      {!selectedCountry && countries.length === 1 && <CountryDetails country={countries[0]} />}
    </div>
  )
}

export default App