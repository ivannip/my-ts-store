import { PrismaClient } from "@prisma/client";
import { NewProductType, NewTransactionType } from "../types";
import { promiseHooks } from "v8";


const prisma = new PrismaClient();


const readAllProduct = async () => {
    try {
        return await prisma.fruit_product.findMany();
    } catch (err) {
        console.log(err)
        throw err
    }
}

const readProductById = async (id: number) => {
    try {
        return await prisma.fruit_product.findUnique({
            where: {id: id}
        })
    } catch (err) {
        console.log(err)
        throw err
    }
}

const createProduct = async (product: NewProductType) => {
    try {
        return await prisma.fruit_product.create({
            data: {
                name: product.name,
                imgUrl: product.imgUrl,
                price: product.price
            }
        })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const createManyProducts = async (products: NewProductType []) => {
    try {
        //createMany is not supported by sqllite
        // return await prisma.fruit_product.createMany ({
        //     data: products
        // })
        const createManyProduct = products.map(product => prisma.fruit_product.create({data: product}))
        await Promise.all(createManyProduct)
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const deleteAllProduct = async () => {
    try {
        await prisma.fruit_product.deleteMany({})
    } catch (err) {
        console.log(err)
        throw err
    }
}

// const updateMultiProductInventory = async (purchasedItems: NewTransactionType []) => {    
//     return await new HandleOrderProcess(prisma).updateInventoryByOrder(purchasedItems)
// }

export const productService = {
    createProduct,
    readAllProduct,
    readProductById,
    deleteAllProduct,
    createManyProducts
}