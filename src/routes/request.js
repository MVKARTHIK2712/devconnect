const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require("../middleware/auth");


//api to send connection request
requestRouter.post("/sendConnectionRequest",userAuth,async (req, res) => {
    const user=req.user;

    //sending a connetin req
    console.log("sending req");
    res.send(user.firstName+"  sent the conection request");

});



module.exports = requestRouter;