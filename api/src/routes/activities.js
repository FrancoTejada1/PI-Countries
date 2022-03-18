const { Router } = require('express');
const {Country, ActivityTourist} = require('../db.js');

const router = Router();

router.post('/activity', async (req,res) => {

    const {name, dificult, duration, season, country} = req.body;

    const createActivity = await ActivityTourist.create({
        name,
        dificult,
        duration,
        season
    })

    const activityByCountry = await Country.findAll({
        where: {
            name: country
        }
    })

    createActivity.addCountry(activityByCountry);

    res.status(200).send("se creo la actividad exitosamente")

})

module.exports = router;