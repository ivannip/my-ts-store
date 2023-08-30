# my-ts-store
Simple Shopping Cart
This is side project to demostrate the usage of NodeJS and ReactJS. It is using Prisma for ORM and Redis as message queue. The application is hosted in Render.com which is deployed by Git Action.
The demo is shown here: https://my-ts-store.onrender.com/

Default inventory number of each item is 100. The default status of new order is pending. A background process will confirm the order if the order quantity can be fulfilled by the inventory, i.e. less than the inventory available, otherwise the order will be cancelled and refunded.
