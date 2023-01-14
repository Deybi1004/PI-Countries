const { Router } = require("express");
const { Country,Activity } = require("../db")
const router = Router();


const{
    getApiInfo,
    getIdInfo,
} = require("../controllers/countries");

    // OBTENER TODOS LOS PAÍSES y el nombre
    router.get("/", async(req,res) => {
        const {name} = req.query;
        let allCountries = await getApiInfo();

        if(name){
            
            try {
                let found = allCountries.find( f => f.name.toLowerCase() === name.toLowerCase());
                //console.log(found)
                
                 let foundApi = await Country.findOne({
                    where: {
                        id: (found.id).toUpperCase()
                    }, 
                    include: [{ 
                        model: Activity,
                        attributes: [ 'name', 'difficulty', 'duration', 'season',],
                        through: { attributes: [] }
                    }] 
                  }); 
                foundApi
               ? res.status(200).send(foundApi)
               : res.status(404).send("country not found"); 
    
            } catch (error) {
                console.error(error);
                res.status(500).send(error);
            }
        } else {
           
            //console.log(allCountries.length)
            res.status(200).send(allCountries);
        }

    })

    // Traer los countries por id

    router.get('/:id', async (req,res) =>{
        let {id} = req.params
        id = id.toUpperCase();

        foundId = await getIdInfo(id);
        try{
            
            //console.log(foundId);
            foundId
            ?res.status(200).send(foundId)
            :res.status(404).send("Not Found Country ID");
            
        }catch(err){
            res.status(404).send("Country not found");
        }


    })





module.exports = router;