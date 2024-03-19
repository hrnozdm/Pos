import mongoose, { Schema } from "mongoose";


const BillSchema=new Schema({
    customerName: { type: String, required: true },
    customerPhoneNumber: { type: String, required: true },
    paymentMode: { type: String, required: true },
    cartItems: { type: Array, required: true },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    
},{timestamps:true})

export default mongoose.model("bills",BillSchema);