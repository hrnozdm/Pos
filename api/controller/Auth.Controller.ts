import { Request,Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/UserSchema.models";
import jwt from 'jsonwebtoken';
class AuthController {

       public static async register(req:Request,res:Response){
           try {
              const hashPass=bcrypt.hashSync(req.body.password,10);
              const newUser=new User({...req.body,password:hashPass});
              await newUser.save();
              res.status(201).json({'msg':'Kullanıcı kaydı başarılı',newUser});
           } catch (error) {
              res.status(500).json(error);
           }
       }

        public static async login(req:Request,res:Response){

                try {
                    const user:any=await User.findOne({email:req.body.email});
                    if (!user){
                            res.status(500).json({'msg':'Kullanıcı  bulunamadı'});
                     }

                    const jwtKey:any=process.env.JWT_KEY;
                    const token=jwt.sign({_id:user.id},jwtKey,{expiresIn:'1h'});
                    

                    const matchPasword=await bcrypt.compare(req.body.password,user.password);

                    if (!matchPasword){
                        res.status(403).json({'msg':'Şifre hatalı'});
                    }

                    if (matchPasword){
                        res.cookie("accessToken",token,{httpOnly:true}).status(200).json({'message':'Giriş Başarılı',user,token});
                    }    
                    
                } catch (error) {
                    res.status(500).json(error);
                }

        }


}

export default AuthController;