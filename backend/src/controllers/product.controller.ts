import { RequestHandler, Request, Response } from "express"
import { productService } from "../services/product.service"
import { ProductType, NewProductType } from "../types";


const showProductById: RequestHandler<{id: string}> = async (req: Request, res: Response) => {
    try {
        const product: ProductType = await productService.readProductById(parseInt(req.params.id));
        res.status(200).json({message: "Product found!", product: product})
    } catch (err) {
        res.status(500).json({message: err})
    }

}

const showAllProduct: RequestHandler = async (req: Request, res: Response) => {
    try {
        const products: ProductType [] = await productService.readAllProduct()
        res.status(200).json({message: "Products founds!", products: products})
    } catch (err) {
        res.status(500).json({message: err})
    }

}

const newProduct: RequestHandler <{}, {}, NewProductType> = async (req: Request, res: Response) => {
    try {
        const product: ProductType = await productService.createProduct(req.body)
        res.status(200).json({message: "product inserted", product: req.body})
    } catch (err) {
        res.status(500).json({message: "Record insert failure."})
    }

}

export const productController = {
    showProductById,
    showAllProduct,
    newProduct
}