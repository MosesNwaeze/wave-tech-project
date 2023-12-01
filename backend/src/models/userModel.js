const {DataTypes} = require("sequelize");
const sequelize = require("../config/database-connection");


const UserModel = sequelize.define("users",{
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{createdAt:false,updatedAt:false});

sequelize.sync({force:true})
    .then(()=>console.log("user model created successfully"))
    .catch((error)=>console.log(error));

module.exports = {UserModel,sequelize};

