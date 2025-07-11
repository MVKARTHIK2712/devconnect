const express=require("express");

const app=express();

//this will only handle get calls to /user
app.get("/user/:userid/:name/:password",(req,res)=>{
    console.log(req.params);

    res.send({firstname:"karna",lastname:"yadav"});
});


app.listen(3000,()=>{
    console.log("server is peerfectly listining on port 7777")
});