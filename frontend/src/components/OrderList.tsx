import { Stack } from "react-bootstrap";
import { OrderType, TransactionType } from "../context/types";
import { OrderedItem } from "./OrderedItem";
import { formatCurrency } from "../util/formatCurrency";


export function OrderList(order: OrderType) {

    const transactions: TransactionType [] = order.purchasedItems;
    return (
        <>
                <div className="order-list">
                    <p className="fs-6">Order No.: {order.id} with status: {order.status}</p>
                    <Stack direction="horizontal" gap={2} className="d-flex">
                    {transactions.map( item => (
                                <OrderedItem product={item.product} quantity={item.quantity}/>
                            ))}
                    </Stack>
                    <div className="orderlist-total fw-bold fs-6">
                        Total {
                            formatCurrency( transactions.reduce( (total, orderedItem) => {
                                    return total + (orderedItem.product?.price || 0) * orderedItem.quantity
                                }, 0)
                            )}
                    </div>

                </div>  
        </>
    )
}