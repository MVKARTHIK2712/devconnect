const mongoose=require('mongoose');
const validator=require('validator');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:20,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true, 
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid  " +value);
            }
        }

    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough:"+value);
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://uhs-group.com/wp-content/uploads/2020/08/person-dummy-e1553259379744.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo URL is not valid "+value);
            }
        }
    },
    about:{
        type:String,
        default:"No about provided",
    },
    skills:{
        type:[String],
    }
},
{
    timestamps:true,
});

module.exports=mongoose.model("User",userSchema);