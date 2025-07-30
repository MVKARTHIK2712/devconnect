const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const {validateProfileEditData} = require("../utils/validations");


//profile api
profileRouter.get("/profile/view",userAuth,async (req, res) => {
    try{
        const user=req.user;
        res.send(user);
        
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }

});
//profile edit api
profileRouter.patch("/profile/edit",userAuth,async (req, res) => {
    try{
       if(!validateProfileEditData(req)){
            throw new Error("Invalid fields for profile edit");
        }
        const loggedInUser=req.user;

        Object.keys(req.body).forEach((key=>
            loggedInUser[key]=req.body[key]
        ));

        await loggedInUser.save();
        res.json({
            message:`${loggedInUser.firstName},your profile updated successfully`,
            data: loggedInUser
        });
    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});


module.exports = profileRouter;