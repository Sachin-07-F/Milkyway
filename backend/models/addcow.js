import mongoose from "mongoose";
const schemaData= new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
    },
    image:{
        type:String,
        default:''
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    
},{
    timestamps:true
})

const userModel = mongoose.model("cowss",schemaData)



export default userModel