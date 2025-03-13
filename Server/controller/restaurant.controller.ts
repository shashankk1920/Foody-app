import { Request, Response } from "express";
import { Restaurant } from "../models/resturant.model";
import { Multer } from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { order } from "../models/order.model";

export const createRestaurant = async(req:Request,res:Response):Promise<any> =>{
    try {
        const {resturantName, city, country, price, delveryTime, rating, cuisiens} = req.body;
        const file =req.file;
        const restaurant = await Restaurant.findOne({user:req.id}) ;

        if(restaurant){
            return res.status(400).json({message:"Restaurant already exists"});
        }
        if(!file){
            return res.status(400).json({
                sucess:false,
                message:"Please upload an image"});

        }

        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

        await Restaurant.create({
            user:req.id,
            resturantName,
            city,
            country,
            price,
            delveryTime,
            rating,
            cuisiens:JSON.parse(cuisiens),
            imageUrl,
        });

        return res.status(201).json({
            success:true,
            message:"Restaurant created successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server Error"})
    }
}

export const getRestaurants = async(req:Request,res:Response):Promise<any> =>{
    try {
        const restaurants = await Restaurant.find();
        return res.status(200).json({
            success:true,
            restaurants
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server Error"})
    }
}

export const getRestaurant = async(req:Request,res:Response):Promise<any> =>{
try {
    const restaurant = await Restaurant.findById(req.params.id);
    if(!restaurant){
        return res.status(404).json({message:"Restaurant not found"});
    };
    return res.status(200).json({
        success:true,
        restaurant
    });
} catch (error) {
    console.error(error);
    return res.status(500).json({message:"Internal server Error"})
}
}

export const updateRestaurant = async(req:Request,res:Response):Promise<any> =>{
    try {
        const {resturantName, city, country, deliveryTime, cuisines } = req.body;
        const restaurant = await Restaurant.findOne({user:req.id});
        if(!restaurant){
            return res.status(404).json({message:"Restaurant not found"});
        }
        restaurant.restaurantName = resturantName;
        restaurant.city = city;
        restaurant.country = country;                           
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = JSON.parse(cuisines); 

         if (req.file) {
            const file = req.file;
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;

         }

         await restaurant.save();
         return res.status(200).json({
             success:true,
             message:"Restaurant updated successfully",
             restaurant,
         });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server Error"})
    }
}


export const getRestaurantOrder = async(req:Request,res:Response):Promise<any> =>{
    try {

       const restaurant = await Restaurant.findOne({user:req.id});
       if(!restaurant){         
           return res.status(404).json
           ({success:false,
            message:"Restaurant not found"});
       };
       const orders = await order.find({restaurant:restaurant._id}).populate("user");
       return res.status(200).json({
        success:true,
        message:"Restaurant not found",
        orders,
       })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server Error"})
        
    }
}

export const updateOrderStatus = async(req:Request,res:Response):Promise<any> =>{
    try {
        const {orderId} = req.params;
        const {status} = req.body;
        const foundOrder = await order.findById(orderId);
        if(!foundOrder){
            return res.status(404).json({
                success:false,
                message:"Order not found"});
        } 

        foundOrder.status = status;
        await foundOrder.save();
        return res.status(200).json({
            success:true,       
            message:"Order status updated successfully",
            order:foundOrder,               
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server Error"})
    }
}

export const searchRestaurant = async(req:Request,res:Response):Promise<any> =>{
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery as string || " ";
        const selectedCuisines = (req.query.selectedCuisines as string || " ").split(",").filter(cuisine => cuisine !== " ");


        const query : any = {};

        // baic search based on searchText(name,city,country)
        if(searchText){
            query.$or = [
                {restaurantName:{$regex:searchText,$options:"i"}},
                {city:{$regex:searchText,$options:"i"}},
                {country:{$regex:searchText,$options:"i"}},
            ];
        }

        //fliter on the basis of searchQuery

        if(searchQuery){
            query.$or = [
                {resttaurantName:{$regex:searchText, $option:"i"}},
                {cuisines:{$regex:searchQuery,
                    $option:"i"}},  
                
                        ];
                    }
            //console.log(query);
            ["momos", "burger"]
            if(selectedCuisines.length > 0){
                query.cuisines = { $in: selectedCuisines };
            }

            const restaurants = await Restaurant.find(query);
            return res.status(200).json({
                success: true,
                data:restaurants,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server Error" });
    }
}

export const getSingleRestaurant = async(req:Request,res:Response):Promise<any> =>{
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate({
            path:"menu",
            options:{createdAt:-1},
        });
        if(!restaurant){
            return res.status(404).json({message:"Restaurant not found"});
        };

        return res.status(200).json({
            success:true,
            restaurant,
        });
    } catch (error) {
       console.log(error);
       return res.status(500).json({message:"Internal server Error"}) 
    }
}