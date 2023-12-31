const {UserModel,sequelize} = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req,res)=>{

    const {email, password} = await req.body;

    sequelize.sync()
        .then(async ()=>{

            const salt = await bcrypt.genSalt(10)

            const hashedPassword = await bcrypt.hash(password, salt);

            const userData = {
                email: email,
                password: hashedPassword
            }

          const newUser =   await UserModel.create(userData);

            try {
                const token = jwt.sign({email},process.env.JWT_SECRETE,{expiresIn: "72h"});

                if(newUser){
                    return res.status(200).json({data:{email,token}});
                }
            }catch (e){
                console.log(e);
                return  res.status(500).json(e.message);
            }


        })
        .catch((error)=> console.log(error));
}


module.exports = signup;
