const mongoose=require('mongoose');
const connectdb=async()=>{
    mongoose.connect(
    "mongodb+srv://karnamuraboina:sW2vOxnCK6ftv0Qz@devconnect.eappave.mongodb.net/devconnect"
    );
};
module.exports=connectdb;