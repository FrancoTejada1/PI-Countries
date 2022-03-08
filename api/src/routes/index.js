const { Router } = require('express');
const { Country, ActivityTourist } = require('../db');
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req,res) => {
    //guardamos la query en una constante para poder usarlo despues
    const { name } = req.query.name;
    //guardamos en una constante todo lo de la api
    const apiCountrys = await data()

    
})


module.exports = router;
