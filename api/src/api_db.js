const axios = require('axios');
const { Country } = require('./db');

var urlApi = 'https://restcountries.com/v3.1/all';

const api = async () => {
    const url = await axios.get(urlApi);

    const info = await url.data.map((d) => {
        return {
            id: d.cca3,
            name: d.name.common,
            imgFlag: d.flags,
            continent: d.continents,
            capital: d.capital,
            subregion: d.subregion,
            area: d.area,
            poblation: d.population
        }
    })
    return info;
}

const getCountrys = async () => {
    const info = await Country();
}

module.exports = {
    getCountrys
}

