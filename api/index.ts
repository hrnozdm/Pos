import express,{ Application} from "express";
import dotenv from "dotenv";
import {connectDb} from "./config/config";
import router from "./routes/router";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const app:Application=express();
dotenv.config();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
connectDb();
const port = process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
app.use('/api',router)
app.listen(port,()=>{
    console.log(`Port listen ${port}`); 
});