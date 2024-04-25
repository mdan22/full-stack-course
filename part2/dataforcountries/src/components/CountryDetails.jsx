const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <ul>          
        <li>capital {country.capital}</li>
        <li>area {country.area}</li>
      </ul>
      <h2>languages:</h2>
      <ul>          
      {Object.keys(country.languages).map(languageCode => (
        <li key={languageCode}>{country.languages[languageCode]}</li>
      ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

export default CountryDetails