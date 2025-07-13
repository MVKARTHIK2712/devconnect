const express=require("express");

const app=express();
const {aadminAuth,userAuth}=require("./middleware/auth");

// handle auth middleware for all GET,POST.. requests
app.use("/admin",aadminAuth);
// app.use("/user",userAuth);

app.get("/user/login",(req,res)=>{
    res.send("user login is successful");
});
app.get("/user/data",userAuth,(req,res)=>{
    res.send("user data is sent");
});
app.get("/admin/getalldata",(req,res)=>{
    res.send("all data is sent");
});
app.get("/admin/deleteuser",(req,res)=>{
    res.send("deleted a user");
});




app.listen(3000,()=>{
    console.log("server is peerfectly listining on port 7777")
});