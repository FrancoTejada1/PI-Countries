const { Router } = require('express');
const axios = require('axios');
const { Country, ActivityTourist } = require('../db');
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//FUNCIONES CONTROLADORAS

var urlApi = "https://restcountries.com/v3.1/all";
//obtenemos la informacion de la api
const getApiInfo = async () => {
    const apiUrl = await axios.get(urlApi);

    const info = await apiUrl.data.map((d) => {
        return {
            id: d.cca3,
            name: d.name.common,
            imgFlag: d.flags['png'],
            continent: d.continents[0],
            capital: d.capital ? d.capital[0] : "capital not found",
            subregion: d.subregion ? d.subregion : "subregion not found",
            area: d.area,
            poblation: d.population
        }
    })
    return info;
}

//obtenemos la informacion de la base de datos
/* const getDbInfo = async () => {
    return await Country.findAll({
        include: {
            model: ActivityTourist,
            attributes: ["name"],
            through: {
                attributes: []
            } 
        }
    }) 
}

const allCountrys = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
} */

router.get('/countries', async (req,res) => {
    const countries = await getApiInfo();

    console.log(countries[0]);

    try {
        //Si tiene data, traemos la DB
        let databaseCountries = await Country.findAll({
            include: {
                model: ActivityTourist,
            },
        });
        //si esta vacia, la completamos desde la API
        if(!databaseCountries.length){
        await Country.bulkCreate(countries)
        }
    } catch (error) {
        console.log(error)
    }

    res.status(200).json(countries);

})

router.get('/countries/{idPais}', async (req,res) => {
    const {id} = req.params;

    try {
        const algoId = await Country.findByPk(id);
        res.status(200).json(algoId)
    } catch (error) {
        res.status(400).send("no mi rey")
        
    }
})
router.post('/countries', async (req, res) => {
    const countries = await Country.create({getApiInfo});
    res.json(countries);
});


module.exports = router;
