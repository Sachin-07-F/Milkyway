//below is main of main
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const UserSchema= new mongoose.Schema({
    userName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
},{
    timestamps:true
})


UserSchema.methods.generateToken= async function(){
  try{
    return jwt.sign({
        UserId:this._id.toString(),
        email:this.email
    },
     process.env.JWT_SECRET,
        {
            expiresIn:"1d"  
        }

 );

  }catch(error){
    console.log(error);

  }
}

const UserModel=mongoose.model("Users",UserSchema)

export default UserModel
//above v-1

