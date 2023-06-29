import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../util/formatCurrency"
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps ={
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

export function StoreItem({id, name, price, imgUrl}: StoreItemProps) {

    
    const {getQuantity, increaseQuantity, decreaseQuantity, removeFromCart} = useShoppingCart();
    const quantity = getQuantity(id);

    return (
        <Card className="H-100">
            <Card.Img variant="top" src={imgUrl} height="200px" style={{objectFit: "cover"}} />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2" >{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    { quantity === 0? (
                        <Button className="w-100" onClick={() => increaseQuantity(id)}>+ Add to card</Button>
                    ):  <div className="d-flex flex-column align-item-center" style={{gap: ".5rem"}}>
                            <div className="d-flex align-item-center justify-content-center" style={{gap: ".5rem"}}>
                                <Button onClick={()=> decreaseQuantity(id)}>-</Button>
                                    <div>
                                    <span className="fs-3">{quantity}</span> in Cart
                                    </div>
                                <Button onClick={() => increaseQuantity(id)}>+</Button>
                            </div>
                            <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
                        </div>
                    }
                </div>
            </Card.Body>
        </Card>
    )
}