const aadminAuth=(req,res,next)=>{
    console.log("admin auth is checking");
    const token ="xyz";
    const isauthorized=token==="xyz";
    if(!isauthorized){
        res.status(401).send("unauthorized");
    }
    else{
        console.log("admin auth is successful");
        next();
    }
}
const userAuth=(req,res,next)=>{
    console.log("user auth is checking");
    const token ="xyz";
    const isauthorized=token==="xyz";
    if(!isauthorized){
        res.status(401).send("unauthorized");
    }
    else{
        console.log("user auth is successful");
        next();
    }
}

module.exports={aadminAuth,userAuth};  