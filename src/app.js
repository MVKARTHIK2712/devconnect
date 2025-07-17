const express=require("express");
const connectdb=require("./config/database");
const app=express();
const User=require("./models/user")

app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log(req.body);

    // Creating new instance for user model
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send("User data added");
    } catch (err) {
        console.error("User creation failed:", err);
        res.status(500).send("Internal server error");
    }
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

