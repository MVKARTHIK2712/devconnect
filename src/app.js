const express=require("express")


const app=express();

//this will only handle get calls to /user
app.get("/user",(req,res)=>{
    res.send({firstname:"karna",lastname:"yadav"});
});

app.post("/user",(req,res)=>{
    res.send("data successfully saved to the database");
});

app.delete("/user",(req,res)=>{
    res.send("data successfully deleted");
});
app.patch("/user",(req,res)=>{
    res.send("data updated successfully");
});

//this will match all the http methods api calls to /hello
app.use("/hello",(req,res)=>{
    res.send("hello karna")
});


app.listen(3000,()=>{
    console.log("server is peerfectly listining on port 7777")
});