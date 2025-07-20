"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleRestaurant = exports.searchRestaurant = exports.updateOrderStatus = exports.getRestaurantOrder = exports.updateRestaurant = exports.getRestaurant = exports.createRestaurant = void 0;
const restaurant_model_1 = require("../models/restaurant.model");
const imageUpload_1 = __importDefault(require("../utils/imageUpload"));
const order_model_1 = require("../models/order.model");
const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = yield restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (restaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            });
        }
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }
        const imageUrl = yield (0, imageUpload_1.default)(file);
        yield restaurant_model_1.Restaurant.create({
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
    }
    catch (error) {
        
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createRestaurant = createRestaurant;
const getRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurant_model_1.Restaurant.findOne({ user: req.id }).populate('menus');
        if (!restaurant) {
            return res.status(200).json({
                success: true,
                restaurant: null,
                message: "No restaurant found for this user"
            });
        }
        ;
        return res.status(200).json({ success: true, restaurant });
    }
    catch (error) {
      
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getRestaurant = getRestaurant;
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = yield restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }
        ;
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = JSON.parse(cuisines);
        if (file) {
            const imageUrl = yield (0, imageUpload_1.default)(file);
            restaurant.imageUrl = imageUrl;
        }
        yield restaurant.save();
        return res.status(200).json({
            success: true,
            message: "Restaurant updated",
            restaurant
        });
    }
    catch (error) {
       
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateRestaurant = updateRestaurant;
const getRestaurantOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }
        ;
        const orders = yield order_model_1.order.find({ restaurant: restaurant._id }).populate('restaurant').populate('user');
        return res.status(200).json({
            success: true,
            orders
        });
    }
    catch (error) {
     
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getRestaurantOrder = getRestaurantOrder;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = yield order_model_1.order.findById(orderId);
        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        orders.status = status;
        yield orders.save();
        return res.status(200).json({
            success: true,
            status: orders.status,
            message: "Status updated"
        });
    }
    catch (error) {
      
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateOrderStatus = updateOrderStatus;
const searchRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchText = req.query.q || "";
        const selectedCuisines = (req.query.selectedCuisines || "")
            .split(",")
            .map(cuisine => cuisine.trim())
            .filter(cuisine => cuisine !== "");
        const query = {};
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
            const allRestaurants = yield restaurant_model_1.Restaurant.find(query);
            const selectedNormalized = selectedCuisines.map(c => c.trim().toLowerCase());
            const filteredRestaurants = allRestaurants.filter(r => {
                if (!Array.isArray(r.cuisines))
                    return false;
                // Normalize stored cuisines
                const storedNormalized = r.cuisines.map((c) => c.trim().toLowerCase());
                // At least one selected cuisine matches stored cuisines
                return selectedNormalized.some(sel => storedNormalized.includes(sel));
            });
            // Sort: exact match in restaurantName or city comes first
            const searchTextLower = searchText.toLowerCase();
            const sortedRestaurants = filteredRestaurants.sort((a, b) => {
                const aExact = (a.restaurantName.toLowerCase() === searchTextLower ||
                    a.city.toLowerCase() === searchTextLower);
                const bExact = (b.restaurantName.toLowerCase() === searchTextLower ||
                    b.city.toLowerCase() === searchTextLower);
                if (aExact && !bExact)
                    return -1;
                if (!aExact && bExact)
                    return 1;
                return 0;
            });
            return res.status(200).json({
                success: true,
                data: sortedRestaurants
            });
        }
        
        const restaurants = yield restaurant_model_1.Restaurant.find(query);
        // Sort: exact match in restaurantName or city comes first
        const searchTextLower = searchText.toLowerCase();
        const sortedRestaurants = restaurants.sort((a, b) => {
            const aExact = (a.restaurantName.toLowerCase() === searchTextLower ||
                a.city.toLowerCase() === searchTextLower);
            const bExact = (b.restaurantName.toLowerCase() === searchTextLower ||
                b.city.toLowerCase() === searchTextLower);
            if (aExact && !bExact)
                return -1;
            if (!aExact && bExact)
                return 1;
            return 0;
        });
        return res.status(200).json({
            success: true,
            data: sortedRestaurants
        });
    }
    catch (error) {
        console.error("Search Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.searchRestaurant = searchRestaurant;
const getSingleRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurantId = req.params.id;
        const restaurant = yield restaurant_model_1.Restaurant.findById(restaurantId).populate({
            path: 'menus',
            options: { sort: { createdAt: -1 } } // Ensure sorting works correctly
        });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }
        return res.status(200).json({ success: true, restaurant });
    }
    catch (error) {
        console.error("Error fetching restaurant:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSingleRestaurant = getSingleRestaurant;
