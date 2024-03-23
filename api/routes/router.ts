import { Router } from "express";
import CategoryController from "../controller/Category.controller";
import ProductController from "../controller/Product.controller";
import BillController from "../controller/Bill.controller";
import AuthController from "../controller/Auth.Controller";
import UserController from "../controller/User.Controller";

const router=Router();


router.get('',(req,res)=>{ res.status(200).json({'msg':'Ana Route'})});

//!UserRoute
router.get('/getUser/:userId',UserController.getUser);

//!AuthRoute
router.post('/register',AuthController.register);
router.post('/login',AuthController.login);

//!CategoryRoute
router.post('/createCategory',CategoryController.createCategory);
router.get('/getAllCategory',CategoryController.getAllCategory);
router.put('/updateCategory',CategoryController.updateCategory);
router.delete('/deleteCategory',CategoryController.deleteCategory);


//!ProductRoute
router.post('/createProduct',ProductController.createProduct);
router.put('/updateProduct',ProductController.updateProduct);
router.get('/getAllProduct',ProductController.getAllProduct);
router.get('/getSingleProduct/:productId',ProductController.getsingleProduct);
router.delete('/deleteProduct',ProductController.deleteProduct);

//!BillRoute
router.post('/createBill',BillController.createBill);
router.get('/getAllBill',BillController.getAllBill);


export default router;

