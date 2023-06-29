import { Stack } from "react-bootstrap";
import { ProductType } from "../context/types";
import { formatCurrency } from "../util/formatCurrency";

type OrderItemPropType = {
    product: ProductType
    quantity: number
}

export function OrderedItem(props: OrderItemPropType) {

    const item: ProductType = props.product;
    const quantity = props.quantity;
    return (
        
            <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
                <img src={item.imgUrl} className="ordered-img" />
                <div className="me-auto text-muted" style={{fontSize:"0.75rem"}}>
                    <div >
                        {formatCurrency(item.price)}x{quantity}
                    </div>
                    <div>
                        ={formatCurrency(item.price * quantity)}
                    </div>
                </div>
                
            </Stack>
        
    )
}