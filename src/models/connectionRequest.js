const mongoose=require("mongoose");


const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum:{
            values: ["ignored", "interested", "accepted", "rejected"],
            message:`{VALUE} is not a valid status`
        }
    }
},
{
    timestamps:true
}
);

//connectionRequestSchema.find({fromUserId:98726r79826r06r0170,toUserId:98726r79826r06r0170})
connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    //check if fromUserId and toUserId are the same
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send a connection request to yourself");
    }
    next();
})



const ConnectionRequestModel=mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequestModel;
