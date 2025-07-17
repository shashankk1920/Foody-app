import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Multer } from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";
import {order} from "../models/order.model"


export const createRestaurant = async (req: Request, res: Response):Promise<any> => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
 

        const restaurant = await Restaurant.findOne({ user: req.id });
        if (restaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            })
        }
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        }
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        await Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            imageUrl
        });
        return res.status(201).json({
            success: true,
            message: "Restaurant Added"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const getRestaurant = async (req: Request, res: Response):Promise<any> => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                restaurant:[],
                message: "Restaurant not found"
            })
        };
        return res.status(200).json({ success: true, restaurant });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const updateRestaurant = async (req: Request, res: Response):Promise<any> => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        };
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = JSON.parse(cuisines);

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant.save();
        return res.status(200).json({
            success: true,
            message: "Restaurant updated",
            restaurant
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const getRestaurantOrder = async (req: Request, res: Response):Promise<any> => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        };
        const orders = await order.find({ restaurant: restaurant._id }).populate('restaurant').populate('user');
        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const updateOrderStatus = async (req: Request, res: Response):Promise<any> => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await order.findById(orderId);
        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }
        orders.status = status;
        await orders.save();
        return res.status(200).json({
            success: true,
            status:orders.status,
            message: "Status updated"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const searchRestaurant = async (req: Request, res: Response): Promise<any> => {
    try {
        const searchText = req.query.q as string || "";
        const selectedCuisines = (req.query.selectedCuisines as string || "")
            .split(",")
            .map(cuisine => cuisine.trim())
            .filter(cuisine => cuisine !== "");

        const query: any = {};

        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } },
                { cuisines: { $regex: searchText, $options: 'i' } },
            ];
        }

        // Robust case-insensitive cuisine filter: normalize both stored and selected cuisines
        if (selectedCuisines.length > 0) {
            // Find all restaurants first, then filter in JS for robust matching
            const allRestaurants = await Restaurant.find(query);
            const selectedNormalized = selectedCuisines.map(c => c.trim().toLowerCase());
            const filteredRestaurants = allRestaurants.filter(r => {
                if (!Array.isArray(r.cuisines)) return false;
                // Normalize stored cuisines
                const storedNormalized = r.cuisines.map((c: string) => c.trim().toLowerCase());
                // At least one selected cuisine matches stored cuisines
                return selectedNormalized.some(sel => storedNormalized.includes(sel));
            });
            // Sort: exact match in restaurantName or city comes first
            const searchTextLower = searchText.toLowerCase();
            const sortedRestaurants = filteredRestaurants.sort((a, b) => {
                const aExact = (
                    a.restaurantName.toLowerCase() === searchTextLower ||
                    a.city.toLowerCase() === searchTextLower
                );
                const bExact = (
                    b.restaurantName.toLowerCase() === searchTextLower ||
                    b.city.toLowerCase() === searchTextLower
                );
                if (aExact && !bExact) return -1;
                if (!aExact && bExact) return 1;
                return 0;
            });
            return res.status(200).json({
                success: true,
                data: sortedRestaurants
            });
        }

        console.log("Search Query:", JSON.stringify(query, null, 2));

        const restaurants = await Restaurant.find(query);

        // Sort: exact match in restaurantName or city comes first
        const searchTextLower = searchText.toLowerCase();
        const sortedRestaurants = restaurants.sort((a, b) => {
            const aExact = (
                a.restaurantName.toLowerCase() === searchTextLower ||
                a.city.toLowerCase() === searchTextLower
            );
            const bExact = (
                b.restaurantName.toLowerCase() === searchTextLower ||
                b.city.toLowerCase() === searchTextLower
            );
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;
            return 0;
        });

        return res.status(200).json({
            success: true,
            data: sortedRestaurants
        });
    } catch (error) {
        console.error("Search Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getSingleRestaurant = async (req: Request, res: Response): Promise<any> => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate({
            path: 'menus',
            options: { sort: { createdAt: -1 } }  // Ensure sorting works correctly
        });

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        return res.status(200).json({ success: true, restaurant });
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
