const express=require("express");
const connectdb=require("./config/database");
const app=express();
const User=require("./models/user");
const {validateSignUpData}= require("./utils/validations");
const bcrypt = require("bcrypt");
const validator = require("validator");

app.use(express.json());

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

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            res.send("Login successful");
        }
        else{
            throw new Error("Invalid credentials");
        }
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
    
})
//get user by email id
app.get("/user",async(req, res) => {
    const useremail=req.body.emailId;
    try{
           const user= await User.findOne({emailId:useremail});
           if(!user) {
               return res.status(404).send("No user found with this email");
           }
           else{
                res.send(user);
           }
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});
//delete by using id
app.delete("/user",async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});
//update by using user id
app.patch("/user/:userId",async (req, res) => {
    const userId = req.params?.userId;
    const data= req.body;
    
    try{
        const ALLOWED_UPDATES = ["skills","photoUrl", "age","about","gender" ]
        const isUpdateAllowed = Object.keys(data).every((key) =>
            ALLOWED_UPDATES.includes(key)
        );
        if(!isUpdateAllowed) {
            throw new Error("Invalid update fields");   
        }
        if(data?.skills.length >10){
            throw new Error("Skills cannot be more than 10");
        }

        const user = await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument: "after",
            runValidators: true,
        });
        console.log(user);
        res.send("user updated successfully");
    }
    catch(err){
        res.status(400).send("update failed   "+err.message);
    }
    
});

//get all users
app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find();
        res.send(users);
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})


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

