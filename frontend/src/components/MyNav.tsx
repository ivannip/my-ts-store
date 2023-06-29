import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"

export function MyNav() {

    const {cartQuantity, openCart} = useShoppingCart()

    return (
        <>
        <Navbar sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
                    <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
                    <Nav.Link to="/Order" as={NavLink}>Order</Nav.Link>
                </Nav>
                {cartQuantity > 0 &&
                    (<Button onClick={openCart} style={{width: "3rem", height: "3rem", position: "relative"} }
                            variant="outline-primary"
                            className="rounded-circle">
                                <i className="fa fa-shopping-cart" style={{fontSize:"24px"}}></i>
                    </Button>)
                }
                <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                                style={{color: "white", width:"1.5rem", height: "1.5rem", position: "relative",
                                 bottom:-10, right: 20, transform: "translate(25%, 25%)"}}>{cartQuantity}</div>
            </Container>
        </Navbar>
        </>
        
    )
}