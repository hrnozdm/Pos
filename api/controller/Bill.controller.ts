import { Request,Response } from "express";
import Bill from "../models/BillSchema";
class BillController{

    public static async createBill(req:Request,res:Response){

        try {
           const newBilll=new Bill(req.body);
           await newBilll.save();
           res.status(201).json({'message':'Fatura kaydı başarılı',newBilll});      
        } catch (error) {
           res.status(500).json(error);
        }
    }

    public static async getAllBill(req:Request,res:Response){

        try {
           const bills=await Bill.find();
           res.status(200).json({'message':'Faturalar getirildi',bills});      
        } catch (error) {
           res.status(500).json(error);
        }
    }
    
    
}


export default BillController;