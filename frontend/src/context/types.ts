export type ProductType  = {
    id: number
    name: string
    price: number
    imgUrl: string
    inventory: number
}

export type OrderType = {
    id: number
    customer?: string
    contact?: string
    createDate?: Date
    deliveryDate?: Date
    deliveryAddress?:string
    status: string
    purchasedItems:  TransactionType[]
}

export type TransactionType = {
    id: number,
    quantity: number,
    purchaseDate: Date,
    createDate: Date,
    product: ProductType
}