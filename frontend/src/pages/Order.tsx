import { Col, Container, Row } from "react-bootstrap";
// import { useShoppingCart } from "../context/ShoppingCartContext";
import { OrderList } from "../components/OrderList";
import { useEffect, useState } from "react";
import { OrderType } from "../context/types";
import axios from "axios";

export function Order() {

    // const {orders} = useShoppingCart();
    const [orders, setOrders] = useState<OrderType []>([])

    useEffect( () => {

        const fetch = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}order/all`)
            setOrders(res.data.orders)
        }

        fetch()

    }, [])

    return (
        <>
            <h1>Orders</h1>
            <Container fluid className="order-container">
            <Row md={2} xs={1} className="g-3">
            {orders.map(order => (
                        <Col key={order.id}>
                            <OrderList {...order}/>
                        </Col>
                    ))}
                
            </Row>
            </Container>
        </>
    )
}

