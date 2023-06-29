import { Footer } from "./Footer";

export function Home() {

    return (
     <>   
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
                <img src="/imgs/fruit-store.jpeg" className="d-block mx-lg-auto img-fluid" alt="Fruit Store" width="700" height="500" loading="lazy"/>
                
            </div>
            <div className="col-lg-6">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Simple Shopping Cart</h1>
                <p className="lead">This is side project to demostrate the usage of NodeJS and ReactJS. It is using Prisma for ORM and Redis as message queue. The application is hosted in Render.com which is deployed by Git Action.</p>
                <p className="fs-6">Default inventory number of each item is 100. The default status of new order is pending. A background process will confirm the order if the order quantity can be fulfilled by the inventory, i.e. less than the inventory available, otherwise the order will be cancelled and refunded.</p>
                
            </div>
            </div>
        </div>
        <Footer />
    </>
    
    
    )
}