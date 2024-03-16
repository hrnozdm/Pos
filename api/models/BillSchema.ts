import mongoose, { Schema } from "mongoose";


const BillSchema=new Schema({
    customerName: { type: String, require: true },
    customerPhoneNumber: { type: String, require: true },
    paymentMode: { type: String, require: true },
    cartItems: { type: Array, require: true },
    subTotal: { type: Number, require: true },
    tax: { type: Number, require: true },
    totalAmount: { type: Number, require: true },
    
},{timestamps:true})

export default mongoose.model("bills",BillSchema);