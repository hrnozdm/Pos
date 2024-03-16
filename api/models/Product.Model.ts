import mongoose, { Schema } from "mongoose";


const ProductSchema=new Schema({
    title: { tpye: String, require: true },
    img: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
    
},{timestamps:true})

export default mongoose.model("products",ProductSchema);