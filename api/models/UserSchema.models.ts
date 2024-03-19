import mongoose, { Schema } from "mongoose";


const UserSchema=new Schema({
    username: { type: String, require: true,unique:true},
    email: { type: String, require: true,unique:true},
    password: { type: String, require: true },
    
},{timestamps:true})

export default mongoose.model("users",UserSchema);