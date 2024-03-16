import { Request,Response } from "express";
import Category from "../models/Category.Models";
class CategoryController{


    public static async createCategory(req:Request,res:Response){

        const title=req.body.title;
        try {
            const newCategory=new Category({title:title});
            await newCategory.save();
            res.status(201).json({'message':'Kategori kayıt işlemi başarılı',newCategory})
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public static async getAllCategory(req:Request,res:Response){
        try {
            const categories=await Category.find();
            if (categories){
                res.status(200).json({'message':'Kategoriler çekildi',categories});
            }
        } catch (error) {
            console.log(error);
        }
    }
    
}


export default CategoryController;