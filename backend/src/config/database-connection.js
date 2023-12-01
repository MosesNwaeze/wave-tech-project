const {Sequelize} = require("sequelize");


const sequelize = new Sequelize('wave-tech-db', 'root', 'root', {
    dialect: 'mysql',
    host: "database",
    operatorAlias:false,
    logging:false,
    port:3306,
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },

})

sequelize.authenticate()
    .then(()=>console.log("Connection established successfully======================> "))
    .catch((error)=>console.log(error))

module.exports = sequelize;