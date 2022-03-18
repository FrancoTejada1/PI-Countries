const { Router } = require('express');
const axios = require('axios');
const {Country, ActivityTourist} = require('../db.js');

const router = Router();

var urlApi = "https://restcountries.com/v3.1/all";
//obtenemos la informacion de la api
const getApiInfo = async () => {
    const apiUrl = await axios.get(urlApi);

    const info = await apiUrl.data.map((d) => {
        return {
            id: d.cca3,
            name: d.name.common,
            imgFlag: d.flags.png,
            continent: d.continents[0],
            capital: d.capital ? d.capital[0] : "capital not found",
            subregion: d.subregion ? d.subregion : "subregion not found",
            area: d.area,
            poblation: d.population
        }
    })
    return info;
}

router.get('/:id', async (req,res) => {
    const {id} = req.params;
    const countries = await getApiInfo();

    try {
        let databaseCountries = await Country.findAll();
        //si esta vacia, la completamos desde la API
        if(!databaseCountries.length){
        await Country.bulkCreate(countries)
        } 
        
        const findById = await Country.findByPk(id.toUpperCase({
            include: {
            
            }
        }));
        res.status(200).send(findById)
    } catch (error) {
        res.status(400).send(error)
        
    }
})

//ESTA RUTA ES PARA FILTRAR POR NOMBRE DEL PAIS
router.get('/', async (req,res,next) => {
    const { name } = req.query;
    console.log(name)
    const countries = await getApiInfo();

    try {
        let databaseCountries = await Country.findAll();
        //si esta vacia, la completamos desde la API
        if(!databaseCountries.length){
        await Country.bulkCreate(countries)
        } 
        
        const pais = await Country.findAll({ include: { model: ActivityTourist } })
            if (name) {
                let paisName = await pais.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
                paisName.length
                ? res.status(200).json(paisName)
                : res.status(404).json({ msg: "Country not found" })
            } else {
                next()
            }
        } catch (error) {
            res.status(400).send(error)
        }
    
})

// ESTA RUTA ME TRAE TODOS LOS PAISES
router.get('/', async (req,res) => {
    const countries = await getApiInfo();

    console.log(countries[0]);

    try {
        //Si tiene data, traemos la DB
        let databaseCountries = await Country.findAll({
            include: {
                model: ActivityTourist,
            }
        });
        //si esta vacia, la completamos desde la API
        if(!databaseCountries.length){
            await Country.bulkCreate(countries)
        }
        
        
        res.status(200).json(countries);
    } catch (error) {
        res.status(400).send(error);
    }
    
})
module.exports = router;