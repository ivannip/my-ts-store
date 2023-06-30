import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import productRouter from "./routes/product.route";
import orderRouter from "./routes/order.route"
import redisRouter from "./routes/redis.route"
import adminRouter from "./routes/admin.route"
import path from "path";
import {redisService} from "./services/redis.service";
// import { createClient } from "redis";
// const redisSubscriber = createClient({url:process.env.REDIS_URL});

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/redis", redisRouter);
app.use("/api/v1/admin", adminRouter);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));


//use '/*' instead of '/' to solve the React Router not function after reload
app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});


app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError.NotFound());
  });

  app.use(
    (
      err: createError.HttpError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      res.status(err.status || 500);
      res.send({
        status: err.status || 500,
        message: err.message,
      });
    }
  );
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));



(async () => {
  // const CHANNEL_NAME = "orderChannel"
  try {
    await redisService.subscriberFromRedis();
  } catch (err) {
    console.log(err)
  }
  
  // await redisSubscriber.connect();
  // await redisSubscriber.subscribe(CHANNEL_NAME, async (id: string) => {   
  //   console.log(`message is ${id}`)          
  // })   
  
})();