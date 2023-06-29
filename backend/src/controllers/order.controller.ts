import { RequestHandler, Request, Response } from "express";
import { NewOrderType, OrderType } from "../types";
import { orderService } from "../services/order.service";


export const newOrder: RequestHandler<{}, {}, NewOrderType> = async (req: Request, res: Response) => {
    try {
        
        const order: OrderType = await orderService.createOrder(req.body, "pending");
        res.status(200).json({message: "ok", order: order})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err})
    }
    
}

export const showOrderById: RequestHandler<{id:string}> = async(req: Request, res: Response) => {
    const id = req.params.id
    
    try {
        const order: OrderType = await orderService.readOrderById(id);
        res.status(200).json({message: "ok", order:order})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err})
    }
}

export const showAllOrder: RequestHandler = async(req: Request, res: Response) => {
    
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