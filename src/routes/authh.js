const express= require("express");
const authRouter=express.Router();

const {validateSignUpData}= require("../utils/validations");
const User=require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");




//signup new user
authRouter.post("/signup", async (req, res) => {
    try {
    // validaton of data
    validateSignUpData(req);
    const{firstName,lastName,emailId,password}=req.body;
    //encrypt the password
    const passwordHash=await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating new instance for user model
    
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();
        res.status(201).send("User added successfully");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});
//login user
authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId, password} = req.body;

        if(!validator.isEmail(emailId)){
            throw new Error("Email is not valid");
        }
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const token=await user.getJWT();
            res.cookie("token",token,{
                expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
            });
            res.send("Login successful");
        }
        else{
            throw new Error("Invalid credentials");
        }
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
    
});



module.exports = authRouter;