const axios = require('axios');
const { Country,Activity } = require('../db')

const getApiInfo = async () => {


    let api = 'https://restcountries.com/v3.1/all'

    let apiInfo = (await axios.get(api)).data;

    let countries = apiInfo.map(country =>{
        return {
            id: country.cca3,
            name: country.name.common,
            image: country.flags.png,
            continent:country.continents[0],
            capital:country.capital ? country.capital[0]:"has no country",
            subregion: country.subregion ? country.subregion : "has no subregion",
            area: country.area,
            population: country.population,
        }
    

    })

    //return countries;
    countries.forEach( e => {
        if (e){
            Country.findOrCreate({
                where:{
                    id:e.id,
                },
                defaults:{
                    name: e.name,
                    image: e.image,
                    continent: e.continent,
                    capital: e.capital,
                    subregion: e.subregion,
                    area: e.area,
                    population: e.population,
                }
            })
        }
    })

    const country = await Country.findAll({
        include: [
          {
            model: Activity,
            attributes: ["id", "name", "difficulty", "duration", "season"],
            through: { attributes: [] }
          }
        ]
      });
    return country;
}

const getIdInfo = async(id) =>{
    console.log(id);

    try {
        
        if (id.match (/^[a-zA-Z]{3}$/ )) {
            
                
            const country = await Country.findOne({
                where: {
                    id: id.toUpperCase()
                }, 
                include: [{ 
                    model: Activity,
                    attributes: ['id','name', 'difficulty', 'duration', 'season',],
                    through: { attributes: [] }
                }] 
              });
             
            return country;
           
        } else{
           
                const apiDb =  await axios.get(`https://restcountries.com/v3.1/alpha/${id}`);
        
                const countryId = {
                    id: apiDb.data.cca3,
                    name: apiDb.data.name,
                    image: apiDb.data.flags.png,
                    continent: apiDb.data.continents[0],
                    capital: apiDb.data.capital ? apiDb.data.capital[0] :"Not has Capital",
                    subregion: apiDb.data.subregion ? apiDb.data.subregion :"Not has Subregion",
                    area: apiDb.data.area,
                    population: apiDb.data.population
        
                }
        
                return countryId; 
    
           
        }
    } catch (error) {
        console.log(error)
    }

}

//getApiInfo();

module.exports = {getApiInfo,getIdInfo};