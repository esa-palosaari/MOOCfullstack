import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({newFilter, setNewFilter, countries}) => {
  const filterNames = (event) => {
    event.preventDefault()
    console.log('char added', event.target)
    if (newFilter === '') {
      return countries.map(newCountry => 
          <p key={newCountry.name}>
              {newCountry.name} {newCountry.number}
          </p>)          
    }
  }

  return  (
    <form onChange={filterNames}>
      find countries <input onChange={event => setNewFilter(event.target.value)} 
                            value={newFilter}  
                      />
    </form>)
}

const Countries = ({newFilter, 
                    setNewFilter, 
                    countries, 
                    weather,
                    setWeather}) => 
{
  const filterToLowerCase = newFilter.toLocaleLowerCase()
  function getcountriesOrFiltered() {
    if(newFilter !== "") {
      return countries.filter(country => 
        country.name.toLowerCase().includes(filterToLowerCase))      
    } else {
      return ([]) //countries
    }
  }
  const filteredcountries = getcountriesOrFiltered()

  const showCountry = (name) =>
  {
      console.log('country name:', name)
      setNewFilter(name)
  }

  const names = () => {
    if (filteredcountries.length > 10) 
    {
        return <p>Too many matches, specify another filter</p>
    } 
    else if (filteredcountries.length===1) 
    {
        return <Country country={filteredcountries[0]} 
                        weather={weather}
                        setWeather={setWeather}        
                />
    }

    return filteredcountries.map(country => 
                      <p key={country.name}>
                          {country.name} {country.number} 
                            <button onClick={() => showCountry(country.name)}>
                                show
                            </button>
                      </p>)
    }
  return names()
}

const Country = ({country, weather, setWeather}) => 
{
    const APIkey = "e56d17d474715070e2250b3c8d825d61"
    useEffect(() => 
    {
        console.log('country effect')
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${APIkey}`)
            .then(response => {
                console.log('weather downloaded')

                setWeather(response.data)
            })
    }, [setWeather, country.capital])

    console.log('weather', weather)

    // App needs to wait until data is downloaded.
    const temperature = (weather.main ? (weather.main.temp-273.15).toFixed(1) : '')
    const wind = (weather.wind ? (weather.wind.speed) : '')
    const icon = (weather.weather ? (weather.weather[0].icon) : '')
    const description = (weather.weather ? (weather.weather[0].description) : '')
    const iconsite = `http://openweathermap.org/img/wn/${icon}.png`

    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map((language) => 
                    <li key={language.name}>
                        {language.name}
                    </li>)}
            </ul>
            <img src={country.flag} alt="country flag" height="150"/>
            <h2>Weather in {country.capital}</h2>

            <p>
                <b>Temperature: </b> {temperature} Celsius
            </p>
          <div>
                    <img src={iconsite}
                          alt={description}
                    />
            </div>
            <p>
                <b>Wind: </b> {wind} m/s
            </p>

        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [weather, setWeather] = useState([])
    const [newFilter, setNewFilter ] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])
    
    console.log('render', countries.length, 'countries')

    return (
        <div>
            <Filter newFilter={newFilter} 
                setNewFilter={setNewFilter}
                countries={countries}
            />
            <Countries newFilter={newFilter}
                        setNewFilter={setNewFilter}
                        countries={countries}
                        weather={weather}
                        setWeather={setWeather}
            />
        </div>
    )
}

export default App