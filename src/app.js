const express=require("express");
const connectdb=require("./config/database");
const app=express();
const User=require("./models/user");
const {validateSignUpData}= require("./utils/validations");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth} = require("./middleware/auth");


app.use(express.json());
app.use(cookieParser());

//signup new user
app.post("/signup", async (req, res) => {
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
app.post("/login",async (req,res)=>{
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
//profile api
app.get("/profile",userAuth,async (req, res) => {
    try{
        const user=req.user;
        res.send(user);
        
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }

});
//api to send connection request
app.post("/sendConnectionRequest",userAuth,async (req, res) => {
    const user=req.user;

    //sending a connetin req
    console.log("sending req");
    res.send(user.firstName+"  sent the conection request");

});





connectdb()
    .then(() => {
        console.log("Database connection established");
        app.listen(3000,()=>{
        console.log("server is peerfectly listining on port 3000")
});
    })
    .catch((err) => {
        console.error("Database cannot be connected");
    });

