const Country = ({country}) => {
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
        </div>
    )
}

export default Country