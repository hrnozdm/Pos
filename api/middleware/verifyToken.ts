import {NextFunction, Request,Response} from "express";
import jwt from "jsonwebtoken";


export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.cookies.accessToken;
    if (!token){
        return res.status(401).json({'msg':'Oturum açılmadı'});
    }

    const jwtKey:any=process.env.JWT_KEY;
    

    jwt.verify(token,jwtKey, async(err:any,payload:any)=>{
         if (err){
            return res.status(403).json({'msg':'Geçersiz Token'});
         }

         next();
    })
}
