import mongoose, { Schema } from "mongoose";


const CategorySchema=new Schema({

    title:{
        unique:true,
        required:true,
        type:String,
    },
},{timestamps:true})

export default mongoose.model("categories",CategorySchema);