const mongoose=require('mongoose');
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
    },
    password:{
        type:String,
        required:true,
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
        default:"https://uhs-group.com/wp-content/uploads/2020/08/person-dummy-e1553259379744.jpg"
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