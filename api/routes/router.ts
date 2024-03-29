import { Router } from "express";
import CategoryController from "../controller/Category.controller";
import ProductController from "../controller/Product.controller";
import BillController from "../controller/Bill.controller";
import AuthController from "../controller/Auth.Controller";
import UserController from "../controller/User.Controller";
import { verifyToken } from "../middleware/verifyToken";

const router=Router();


router.get('',(req,res)=>{ res.status(200).json({'msg':'Ana Route'})});

//!UserRoute
router.get('/getUser/:userId',UserController.getUser);

//!AuthRoute
router.post('/register',AuthController.register);
router.post('/login',AuthController.login);

//!CategoryRoute
router.post('/createCategory',verifyToken,CategoryController.createCategory);
router.get('/getAllCategory',verifyToken,CategoryController.getAllCategory);
router.put('/updateCategory',verifyToken,CategoryController.updateCategory);
router.delete('/deleteCategory',verifyToken,CategoryController.deleteCategory);


//!ProductRoute
router.post('/createProduct',verifyToken,ProductController.createProduct);
router.put('/updateProduct',verifyToken,ProductController.updateProduct);
router.get('/getAllProduct',verifyToken,ProductController.getAllProduct);
router.get('/getSingleProduct/:productId',verifyToken,ProductController.getsingleProduct);
router.delete('/deleteProduct',verifyToken,ProductController.deleteProduct);

//!BillRoute
router.post('/createBill',verifyToken,BillController.createBill);
router.get('/getAllBill',verifyToken,BillController.getAllBill);


export default router;

