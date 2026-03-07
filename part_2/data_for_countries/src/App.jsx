import { useEffect, useState } from "react"
import dataService from './services/services.js'

// component that lists each country on search, or else indicates that there are too many matches
const CountriesList = (props) => {
  return(
  <>
  {props.countries.length > 10
  ?
  <p>Too many matches, specify another filter</p>
  :
  <ul>
    {props.countries.map(country => 
      //need to fix country with unique key instead of index
      (<li key={country.index}>{country.name.common}</li>))
    }
  </ul>
  }
  </>
  )
}

//FlagComponent

const Flag = (props) => {
  const FlagStyle = {
    fontSize: 200
  }
  return(
    <div style={FlagStyle}>
      {props.flag}
    </div>
  )
}
//lists data for a single country
const SingleCountry = (props) => {
  const SingleCountryStyle = {

  }
  const data = props.singleCountry
  return(
    <div style={SingleCountryStyle}>
    <h1>{data.name.common}</h1>
    <p>capital: {data.capital}</p>
    <p>area: {data.area}</p>
    <ul>
      {Object.entries(data.languages).map(([key, value]) => {
        return(
        <li key={key}>{value}</li>
        )
    })}
    </ul>
    <div>
      <Flag flag={data.flag}/>
    </div>
      
    </div>
  )
}

//here's the search bar for countries
const CountrySearch = (props) => {
  return(
  <form>
    <input type='text' placeholder="search a country" onChange={props.onChangeHandler}></input>
  </form>
  )
}

const CountryApp = (props) => {
  return(
  <>
  <CountrySearch onChangeHandler={props.onChangeHandler}/>
  {
  props.countries.length === 1
  ?
  <SingleCountry singleCountry={props.singleCountry}/>
  :
  props.countries.length === 0
  ?
  <p>no countries listed</p>
  :
  <CountriesList countries={props.countries} />
  }
  </>
  )
}

function App() {
  const [allCountries, setAllCountries ] = useState([])
  const [listedCountries, setListedCountries] = useState([])
  const [singleCountry, setSingleCountry] = useState([])

  useEffect(() => {
    dataService
    .getAllData()
    .then(response => 
      setAllCountries(response.map(country => country))
    )
  }, [])

  const handleListedCountries = (event) => {

    const searchValue = event.target.value
    const tempListedCountries = allCountries.filter(country => country.name.common.toLowerCase().startsWith(searchValue.toLowerCase()))
    setListedCountries(tempListedCountries);
    handleSingleCountry(tempListedCountries)
  }

  const handleSingleCountry = (countries) => {
    try {
    const singleCountryName = countries[0].name.common
    dataService
    .getSpecificCountry(singleCountryName)
      .then(response => 
        setSingleCountry(response)
      )
    }
    catch {
      console.log('no countries')
    }
    
  }
  return (
    
    <>
    <CountryApp countries={listedCountries} singleCountry={singleCountry} onChangeHandler={handleListedCountries}/>
    </>
  )
}

export default App
