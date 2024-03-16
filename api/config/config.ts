import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl:any=process.env.mongoUrl2;
const mongooseOptions: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export const connectDb=async ()=>{
    try {
        await mongoose.connect(mongoUrl,mongooseOptions);
        console.log("db connect success");
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
  
}

