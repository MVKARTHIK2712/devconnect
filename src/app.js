const express=require("express");

const app=express();

app.use("/",(err,req,res,next)=>{
    if(err){
    res.status(500).send("Something broke!");
    }
    
});

app.get("/getuserdata",(req,res)=>{
    // try{
        throw new Error("this is an error");
        res.send("user data is sent");
    // }catch(err){
    //         res.status(500).send("Some error occurred conatact support team");
    // }
    
});

app.use("/",(err,req,res,next)=>{
    if(err){
    res.status(500).send("Something broke!");
    }
    
});

app.listen(3000,()=>{
    console.log("server is peerfectly listining on port 7777")
});