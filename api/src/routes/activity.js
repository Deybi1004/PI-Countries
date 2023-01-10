const { Router } = require("express");
const {Country,Activity} = require("../db");
const router = Router();
const {getActivities} = require('../controllers/activities');



router.post("/", async (req,res) => {
    let {name,difficulty,duration,season,countries} = req.body;

    let newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
    })

     countries.forEach(async (c) => {
        const found = await Country.findByPk(c.id)

        found.addActivity(newActivity);
        })
     

    res.json(newActivity);
    

})

 router.get('/',async(req,res)=> {
    const allActivities = await getActivities()
    res.status(200).send(allActivities);
}) 


module.exports = router;