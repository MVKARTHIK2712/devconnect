const express=require("express");

const app=express();

app.use("/user",(req,res,next)=>{
    console.log("router1 succesfull");
    // res.send("router1");
    next();
},
(req,res,next)=>{
    console.log("router2 succesfull");
    next();
    res.send("router2");
},
(req,res,next)=>{
    console.log("router3 succesfull");
    res.send("router3");
    next();
},
(req,res,next)=>{
    console.log("router4 succesfull");
    // res.send("router4");
    next();
});

app.listen(3000,()=>{
    console.log("server is peerfectly listining on port 7777")
});