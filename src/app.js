const express=require("express")


const app=express();
app.use("/",(req,res)=>{
    res.send("hello kk its 3000")
});
app.use("/hello",(req,res)=>{
    res.send("hello karna")
});
app.use("/test",(req,res)=>{
    res.send("hello from the expreess server  ")
});
app.listen(3000,()=>{
    console.log("server is peerfectly listining on port 7777")
});