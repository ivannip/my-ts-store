import { RequestHandler, Request, Response } from "express";
import {deleteAllOrder} from "../services/order.service"
import {deleteAllProduct, createManyProducts} from "../services/product.service"
import storesItems from "../data/items.json"

export const resetDatabase: RequestHandler<never, never, never> = async (req: Request, res: Response) => {

    try {
        
        await deleteAllOrder()
        await deleteAllProduct()
        await createManyProducts(storesItems);
        res.status(200).json({message: "database reset"})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "reset failed", error: err})
    }

}