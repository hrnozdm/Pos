
import express,{ Application, Request,Response } from "express";
const app:Application=express();
import dotenv from "dotenv";
dotenv.config();


const port = process.env.PORT;

app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({'msg':'Anasayfa'});
});



app.listen(port,()=>{
    console.log(`Port listen ${port}`);
    
})