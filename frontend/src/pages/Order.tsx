import { Col, Container, Row } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { OrderList } from "../components/OrderList";

export function Order() {

    const {orders} = useShoppingCart();

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

