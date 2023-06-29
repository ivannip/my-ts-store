import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
import { OrderType} from "../types";
import { HandleOrderProcess } from "../util/HandleOrderProcess";

const redisPublisher = createClient({url:process.env.REDIS_URL});
const redisSubscriber = createClient({url:process.env.REDIS_URL});
const prisma = new PrismaClient();

const CHANNEL_NAME = "orderChannel"

async function publishToRedis(id: string)  {
    await redisPublisher.connect();
    const subscriberCount = await redisPublisher.publish(CHANNEL_NAME, id);
    await redisPublisher.disconnect();
    return subscriberCount;
}

async function subscriberFromRedis() {
    try {
        let status = "confirmed";
        await redisSubscriber.connect();
        await redisSubscriber.subscribe(CHANNEL_NAME, async (id: string) => {           
            try {
                console.log(`message is ${id}`)
                await updateProductInventory(id);
            } catch (err) {
                status = "refund"
            }
            await updateOrderStatus(parseInt(id), status);
            
        })   
        
    } catch (err) {
        console.log(err)
        throw err
    } 
    
}

async function updateProductInventory(id: string) {
    try {
        const order: OrderType = await prisma.order.findUnique({
            where: { id: parseInt(id) },
            include: {
                purchasedItems: {
                    include: { product: true }
                }
            }
        });
        if (order)
            await new HandleOrderProcess(prisma).updateInventoryByOrder(order.purchasedItems);
        else
            throw new Error(`Order number ${id} not Found!`)
    } catch (err) {
        throw err
    }

}
async function updateOrderStatus(id: OrderType["id"], status: OrderType["status"]) {
    await prisma.order.update({
        data: { status: status },
        where: { id: id }
    });
}

export const redisService = {
    publishToRedis,
    subscriberFromRedis
}