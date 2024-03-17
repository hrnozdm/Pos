import { Request,Response } from "express";
import Product from "../models/Product.Model";


class ProductController{
     
    public static async createProduct(req:Request,res:Response){

            try {
               const newProduct=new Product({
                title:req.body.title,
                img:req.body.img,
                price:req.body.price,
                category:req.body.category,
               });
               await newProduct.save();
               res.status(201).json({'message':'Ürün kaydı başarılı',newProduct});      
            } catch (error) {
               res.status(500).json(error);
            }
    }

    public static async updateProduct(req:Request,res:Response){

        try {
           const updatedProduct=await Product.findByIdAndUpdate({_id:req.body.productId},req.body,{new:true});
           res.status(200).json({'message':'Ürün güncellemesi başarılı',updatedProduct});      
        } catch (error) {
           res.status(500).json(error);
    }}

    public static async deleteProduct(req:Request,res:Response){

        try {
           const deletedProduct=await Product.findByIdAndDelete({_id:req.body.productId},{new:true});
           res.status(200).json({'message':'Ürün silme işlemi',deletedProduct});      
        } catch (error) {
           res.status(500).json(error);
    }}


}

