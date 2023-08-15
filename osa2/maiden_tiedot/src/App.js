
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import Country from './components/Country';

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])


const getCountries = () => {
  if (search === '') {
    setCountries([])
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
    setCountries([country])
  }

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
            <li key={country.name.common} >
              {country.name.common} <button onClick={() => showCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      ) : countries.length === 1 && <Country country={countries[0]} />}
      </div>
    </div>
    
  )
}

export default App