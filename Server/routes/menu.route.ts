import express, { Request, Response } from 'express';

import upload from '../middlewares/multer';

import { isAuthenticated } from '../middlewares/isAuthenticated';
import { addMenu, editMenu, getMenus } from '../controller/menu.controller';



const router = express.Router();

router.route("/").get(getMenus); // Public GET route for viewing menus
router.route("/").post(isAuthenticated, upload.single("image"), addMenu);
router.route("/:id").put(isAuthenticated, upload.single("image"), editMenu);
 
export default router;


