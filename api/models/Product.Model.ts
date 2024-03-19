import mongoose, { Schema } from "mongoose";


const ProductSchema=new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    price: { type :Number, required: true },
    category: { type: String, required: true },
    
},{timestamps:true})

export default mongoose.model("products",ProductSchema);