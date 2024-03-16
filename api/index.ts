import express,{ Application, Request,Response } from "express";
import dotenv from "dotenv";
import {connectDb} from "./config/config";
import router from "./routes/router";
import cors from "cors";
const app:Application=express();
dotenv.config();
app.use(cors());
connectDb();
const port = process.env.PORT;
app.use(express.json());
app.use('/api',router)
app.listen(port,()=>{
    console.log(`Port listen ${port}`); 
});