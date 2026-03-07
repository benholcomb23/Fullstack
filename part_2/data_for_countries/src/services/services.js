import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'


//Pulls URL for ALL Countries
const getAllData = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    return request.then(response => response.data)
}

//Pulls URL for Countries by name
const getSpecificCountry = (country) => {
    const request = axios.get(`${baseUrl}/api/name/${country}`)
    return request.then(response => response.data)
}
export default { getAllData, getSpecificCountry }