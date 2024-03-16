import { Router } from "express";
import CategoryController from "../controller/Category.controller";

const router=Router();


router.get('',(req,res)=>{ res.status(200).json({'msg':'Anasayfa'})});
router.post('/createCategory',CategoryController.createCategory);
router.get('/getAllCategory',CategoryController.getAllCategory);



export default router;

