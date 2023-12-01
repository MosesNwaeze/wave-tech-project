const {UserModel,sequelize} = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req,res)=>{
  const {email, password} = await req.body;
  console.log(email,password);

  if(!email || !password){
      return res.status(500).json("Internal Server Error");
  }

      sequelize.sync().then(async ()=> {
          const user = await UserModel.findByPk(email)
          const hashedPassword = user?.password;

          const isAuthenticated = await bcrypt.compare(password,hashedPassword);

          const token = await jwt.sign({email},process.env.JWT_SECRETE,{expiresIn: "72h"});

          if(isAuthenticated){

              return res.status(200).json({data:{token,email}})
          }else{

              return  res.status(401).json("User not authenticated!");
          }
  })
      .catch(e => {
          console.log(e);
          return res.status(500).json("Internal Server Error");
      })



}


module.exports = login;
