import { PrismaClient } from "@prisma/client"
import { TransactionType, ProductType } from "../types";


export class HandleOrderProcess {

    prisma: PrismaClient = null;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    updateInventoryByOrder = async (purchasedItems: TransactionType[]) => {
        let updatedProducts: ProductType[] = [];
        let product: ProductType = null
        return await this.prisma.$transaction( async (tx: PrismaClient) => {

                for (var item of purchasedItems) {
                        product = await tx.fruit_product.update({
                        data: {
                            inventory: {decrement: item.quantity}
                        },
                        where: {
                            id: item.product.id
                        }
                    })
                    if (product.inventory < 0)
                        throw new Error("Not enough inventry for the order")
                    else
                        updatedProducts.push(product)
                }
                return updatedProducts     
        })
    }
}