import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../util/formatCurrency";
import axios from "axios";


type ShoppingCartType = {
    isOpen: boolean
}

export function ShoppingCart({isOpen}:ShoppingCartType) {

    const {emptyCart, closeCart, cartItems, storeItems} = useShoppingCart();

    async function submitOrder() {
        const order = {
            customer: "default",
            contact:"27483274",
            deliveryDate:null,
            deliveryAddress: "default",
            purchasedItems: cartItems.map(item => { return {productId: item.id, quantity: item.quantity}})
        };
        try {
            const result = await axios.post("/api/v1/order/new", order)
            await axios.post("/api/v1/redis/push", {id: result.data.order.id})
        } catch (err) {
            console.log(err)
        }
        
        emptyCart()
        closeCart()
    }

    return (
        <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Cart
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => 
                        <CartItem key={item.id} {...item}/>)
                    }
                
                    <div className="ms-auto fw-bold fs-5">
                        Total {
                            formatCurrency( cartItems.reduce( (total, cartItem) => {
                                    const item = storeItems.find( i => i.id === cartItem.id)
                                    return total + (item?.price || 0) * cartItem.quantity
                                }, 0)
                            )}
                    </div>
                    <div className="ms-auto"><Button className="btn-primary" onClick={submitOrder}>Submit</Button></div>
                    
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}