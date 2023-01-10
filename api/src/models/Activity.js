const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id :{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
   difficulty:{
    type: DataTypes.ENUM("1","2","3","4","5"),
    defaultValue:"1",
    allowNull: false,
   },
   duration: {
    type:DataTypes.STRING,
    allowNull: false,
   },
   season: {
    type: DataTypes.STRING,
    allowNull:false,
   }
  },{timestamps:false});
};
