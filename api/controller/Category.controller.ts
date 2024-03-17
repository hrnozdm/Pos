import { Request,Response } from "express";
import Category from "../models/Category.Models";
class CategoryController{

    //!CategoryCreate
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
    
     //!CategoryAllGet
    public static async getAllCategory(req:Request,res:Response){
        try {
            const categories=await Category.find();
            if (categories){
                res.status(200).json({'message':'Kategoriler çekildi',categories});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //!updateCategory
    public static async updateCategory(req:Request,res:Response){
        try {
          
            const updatedCategory=await Category.findByIdAndUpdate({_id:req.body.categoryId},{title:req.body.title},{new:true});
            res.status(200).json({'message':'Kategori güncellendi',updatedCategory});
            
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //!deleteCategory
    public static async deleteCategory(req:Request,res:Response){
          try {
            const deleteCategory=await Category.findByIdAndDelete({_id:req.body.categoryId},{new:true});
            res.status(200).json({'message':'Kategori silindi',deleteCategory});
          } catch (error) {
            res.status(500).json(error);
          }
    }

    
    
}


export default CategoryController;