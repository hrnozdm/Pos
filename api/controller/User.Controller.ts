import { Request,Response } from "express";
import User from "../models/UserSchema.models";
class UserController{
    public static async getUser(req:Request,res:Response){
          try {
            const user=await User.findById({_id:req.params.userId});
            if (!user){
               res.status(404).json({'msg':'Kullanıcı bulunamadı'})
            }
            res.status(200).json({'msg':'Kullanıcı bulundu',user})
          } catch (error) {
            res.status(500).json(error);
          }
    }
}

export default UserController;