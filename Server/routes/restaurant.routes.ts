import express from "express";
import {
  createRestaurant,
  getRestaurant,
  getRestaurantOrder,
  getSingleRestaurant,
  searchRestaurant,
  updateOrderStatus,
  updateRestaurant,
} from "../controller/restaurant.controller";
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.route("/")
  .post(isAuthenticated, upload.single("imageFile"), createRestaurant)
  .get(isAuthenticated, getRestaurant)
  .put(isAuthenticated, upload.single("imageFile"), updateRestaurant);

router.route("/order").get(isAuthenticated, getRestaurantOrder);
router.route("/order/:orderId/status").put(isAuthenticated, updateOrderStatus);

// Use query parameters for search instead of path parameter
router.route("/search").get(searchRestaurant);
//router.get("/search", isAuthenticated, searchRestaurant);
//i will uuse it when i will have to ben authneticatef
// Keep this at the end to avoid route conflicts
router.route("/:id").get(getSingleRestaurant);

export default router;



