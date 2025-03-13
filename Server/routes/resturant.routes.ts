import express, { Request, Response } from 'express';
import { createRestaurant, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurant } from '../controller/restaurant.controller';
import upload from '../middlewares/multer';

import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.route('/').post(isAuthenticated, upload.single('image'), createRestaurant);  
router.route('/').get(isAuthenticated,  getRestaurant);
router.route('/').put(isAuthenticated, upload.single('image'), updateRestaurant);       
router.route('/order').get(isAuthenticated,  getRestaurantOrder);    
router.route('/order/:orderId/status').put(isAuthenticated,  updateOrderStatus    );
router.route('/:id').post(isAuthenticated,  searchRestaurant);  
router.route('/').post(isAuthenticated, getSingleRestaurant);                      
export default router;  
