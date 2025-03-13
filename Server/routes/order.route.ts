import express from "express"
import { createCheckoutSession, getOrders } from "../controller/order.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Request, Response } from 'express';


const router = express.Router();


router.route("/").get(isAuthenticated, (req: Request, res: Response) => {
	getOrders(req, res).catch(err => {
		console.error("Error in getOrders:", err);
		res.status(500).send("Internal Server Error");
	});
});
router.route("/checkout/create-checkout-session ").post(isAuthenticated, createCheckoutSession)
// router.route("webhook").post()

export default router;