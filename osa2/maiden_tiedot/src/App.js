
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
/*import Country from './components/Country';

const Countries = ({countries, searchValue}) => {
  let searchResult = []
  if (searchResult.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (searchResult.length > 1) {
    return (
      <div>
        <ul>
          {searchResult.map(country =><Country />)}
        </ul>
      </div>
    )
  }
}
*/

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)


const getCountries = () => {
  if (search === '') {
    setCountries([])
    setCountry(null)
    return
  }
  console.log('fetching country informations...')
  axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      const resultCountries = response.data.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase()))
      setCountries(resultCountries)
    })
}
  useEffect(() => {
    getCountries()
  }, [search])
    

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const showCountry = (country) => {
    setCountry(country)
  }
  
  // Nyt ei crashaa, mutta tulee aina too many matches
  // Nyt ei tule enää mitään tulosta, vaikka laittaisi s tai Sweden.
  // 
  // 

  return (
    <div>
      <div>
      <Filter value={search} onChange={handleChange} />
      </div>
      <div>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length > 1 ? (
        <ul>
          {countries.map(country => (
            <li key={country.name.common} onClick={() => showCountry(country)}>
              {country.name.common}
            </li>
          ))}
        </ul>
      ) : countries.length === 1 && (
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>capital {countries[0].capital}<br></br>area {countries[0].area}</p>
          <h4>languages:</h4>
          <ul>
            {Object.values(countries[0].languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={countries[0].flags.png}
            alt={`${countries[0].name.common} flag`}
            width="200"
          />
        </div>
      )}


      </div>
      {}
    </div>
    
  )
}

export default App