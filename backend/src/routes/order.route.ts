import express, { Router } from "express";
import {newOrder, showAllOrder, showOrderById} from "../controllers/order.controller"

const router = express.Router();

router.get("/all", showAllOrder);

router.post("/new", newOrder);

router.get("/one/:id", showOrderById);

export default router;