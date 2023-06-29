import express, {Request, Response} from "express";
import {redisService} from "../services/redis.service"


const router = express.Router();
const CHANNEL_NAME = "orderChannel"


router.post("/push", async (req: Request, res: Response) => {
    console.log(req.body)
    const id = String(req.body.id);
    console.log(id)
    try {
        await redisService.publishToRedis(id)
        res.status(200).json({message: "success"})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "fail in redis call", err})
    }
})



export default router;
