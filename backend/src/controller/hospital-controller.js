const {Hospital,sequelize} = require("../models/hospitalModel");
const mockData = require("../config/hospital-mock-data.json");



async function populateHospital(){
    const hospitalCount = await Hospital.count();
    if(hospitalCount <= 0){
        try{
            const response = await Hospital.bulkCreate(mockData)
            if(response){
                console.log("database populated")
            }
        }catch(e){
            console.log(e);
        }


    }

}
const fetchHospitals = async (req, res) => {

    await populateHospital();
    const result =  await Hospital.findAll();

    res.status(200).json({data: result});

}

module.exports = fetchHospitals;




