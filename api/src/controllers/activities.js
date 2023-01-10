const {Activity} =require ('../db'); 

// Trrae todas las actividades creadas 

 const getActivities= async () => {

    let allActivities = await Activity.findAll();

    return allActivities;

}

module.exports = {getActivities};