const {DataTypes} = require("sequelize");
const sequelize = require("../config/database-connection");


const Hospital = sequelize.define("hospitals",{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_no:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{updatedAt: false, createdAt:false});

sequelize.sync({force:true})
    .then(()=>console.log("user model created successfully"))
    .catch((error)=>console.log(error));

module.exports = {Hospital,sequelize};

