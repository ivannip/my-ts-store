import { PrismaClient } from "@prisma/client";
import { NewOrderType, OrderType } from "../types";

const prisma = new PrismaClient();

const readOrderById = async (id: string) => {
    try {
        return await prisma.order.findUnique({
            where: {id: parseInt(id)},
            include:{
                purchasedItems: {
                    include: { product: true}
                }
            } 
        
        })
    } catch (err) {
        console.log(err)
        throw err
    }
}


const readAllOrder = async () => {
    try {
         return await prisma.order.findMany({include:{
            purchasedItems: {
                include: { product: true}
            }
          } 
        });    
    } catch (err) {
        console.log(err)
        throw(err)
    }
}


const createOrder = async (order: NewOrderType, status: "pending") => {
    try {
        
        return await prisma.order.create({
            data: {
                customer: order.customer,
                contact: order.contact,
                deliveryAddress: order.deliveryAddress,
                status: status,
                purchasedItems: {
                    create: order.purchasedItems
                  }
          },
          include:{
            purchasedItems: {
                include: { product: true}
            }
          } 
        })
        
    } catch (err) {
        console.log(err)
        throw(err)
    }
}

export const deleteAllOrder = async() => {
    try {
        await prisma.transaction.deleteMany({})
        await prisma.order.deleteMany({})
    } catch (err) {
        console.log(err)
        throw(err)
    }
}

export const orderService = {
    readOrderById,
    readAllOrder,
    createOrder,
    deleteAllOrder
}