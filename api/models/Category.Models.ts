import mongoose, { Schema } from "mongoose";


const CategorySchema=new Schema({
 
    title:{
        required:true,
        type:String,
    }
    
},{timestamps:true})

export default mongoose.model("Category",CategorySchema);