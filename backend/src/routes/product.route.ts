import express from "express";
import { productController } from "../controllers/product.controller";

const router = express.Router();

router.post("/new", productController.newProduct);

router.get("/all", productController.showAllProduct);

router.get("/one/:id", productController.showProductById);

export default router;