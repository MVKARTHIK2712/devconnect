const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const {validateProfileEditData} = require("../utils/validations");
const bcrypt = require("bcrypt");


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
//update password or forget password api
profileRouter.patch("/profile/password",userAuth,async (req, res) => {
    try{
        const loggedInUser=req.user;
        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword){
            throw new Error("Old password and new password are required");
        }

        const isPasswordValid = await loggedInUser.validatePassword(oldPassword);
        if(!isPasswordValid){
            throw new Error("Old password is incorrect");
        }

        const passwordHash=await bcrypt.hash(newPassword, 10);
        loggedInUser.password = passwordHash;
        await loggedInUser.save();

        res.json({
            message:`${loggedInUser.firstName}, your password has been updated successfully`
        });

    }
    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;