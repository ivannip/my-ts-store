import { RequestHandler, Request, Response, NextFunction } from "express";
import { NewOrderType, OrderType } from "../types";
import { orderService } from "../services/order.service";
import { redisService } from "../services/redis.service";


export const newOrder: RequestHandler<{}, {}, NewOrderType> = async (req: Request, res: Response, next?: NextFunction) => {
    try {
        
        const order: OrderType = await orderService.createOrder(req.body, "pending");
        redisService.publishToRedis((order.id).toString())
        res.status(200).json({message: "ok", order: order})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err})
    }
    
}

export const showOrderById: RequestHandler<{id:string}> = async(req: Request, res: Response, next?: NextFunction) => {
    const id = req.params.id
    
    try {
        const order: OrderType = await orderService.readOrderById(id);
        res.status(200).json({message: "ok", order:order})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err})
    }
}

export const showAllOrder: RequestHandler = async(req: Request, res: Response, next?: NextFunction) => {
    
    try {
        const orders: OrderType [] = await orderService.readAllOrder();
        res.status(200).json({message: "ok", orders: orders})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err})
    }
}


export const orderController = {
    newOrder,
    showAllOrder,
    showOrderById
}