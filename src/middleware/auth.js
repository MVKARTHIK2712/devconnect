const jwt=require("jsonwebtoken");
const User=require("../models/user");


const userAuth=async (req,res,next)=>{
    try{
        //read the token from the request cookies
        //validate the token
        //find the user
        const cookies=req.cookies;
        const {token}=cookies;
        if(!token){
            throw new Error("invalid token");
        }
        const decodedObj=await jwt.verify(token,"dev@connect$27");

        const{_id}=decodedObj;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("user does not exists");
        }
        req.user=user;
        next();
        }
        catch(err){
            res.status(400).send("ERROR: " + err.message);
        }
    
}

module.exports={
    userAuth
};  