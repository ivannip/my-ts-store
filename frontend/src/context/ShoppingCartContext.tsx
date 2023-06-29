import {ReactNode, createContext, useContext, useState, useEffect} from "react"
import axios from "axios"
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { OrderType } from "./types";

type ShoppingCartProviderProps = {
    children: ReactNode
};

type StoreItemType = {
  id: number
  name: string
  price: number
  imgUrl: string
}

type ShoppingCartContext = {
  getQuantity: (id:number) => number
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  emptyCart: () => void
  openCart: () => void
  closeCart: () => void
  cartQuantity: number
  cartItems: CartItem []
  storeItems: StoreItemType []
  orders: OrderType []
}

type CartItem = {
  id: number
  quantity: number
}


const ShoppingCartContext = createContext({} as ShoppingCartContext);


const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {

    const [cartItems, setCartItems] = useLocalStorage <CartItem []> ("shopping-cart", [])
    const [isOpen, setIsOpen] = useState(false);
    const [storeItems, setStoreItems] = useState <StoreItemType []>([])
    const [orders, setOrders] = useState<OrderType []> ([])

     
    useEffect( () => {

        const fetch = async () => {
            
            let res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}product/all`)
            setStoreItems(res.data.products)

            res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}order/all`)
            setOrders(res.data.orders)
        }

        fetch()
    }, [])

    const cartQuantity = cartItems.reduce( (quantity, item) => item.quantity + quantity, 0);

    const openCart = () => setIsOpen(true);

    const closeCart = () => setIsOpen(false);

    const getQuantity = (id:number):number => { 
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseQuantity = (id: number) => {
      setCartItems(currItems => {
        if (currItems.find(item => item.id === id) == null)
          return [...currItems, {id, quantity:1}]
        else 
          return currItems.map(item => {
            if (item.id === id)
              return {...item, quantity: item.quantity + 1}
            else
              return item
          })  
      })
    };

    const decreaseQuantity = (id: number) => {
      setCartItems(currItems => {
        if (currItems.find(item => item.id === id)?.quantity === 1)
          return currItems.filter(item => item.id !== id)
        else
        return currItems.map(item => {
          if (item.id === id)
            return {...item, quantity: item.quantity - 1}
          else
            return item
        })  
      })
    };

    const removeFromCart = (id:number) => {
      setCartItems(currItems => {
        return currItems.filter(item => item.id !== id)
      })

    };

    const emptyCart = () => {
      setCartItems([])
    }

    return (
      <ShoppingCartContext.Provider value={{getQuantity, increaseQuantity, decreaseQuantity, removeFromCart, emptyCart,
      cartQuantity, cartItems, openCart, closeCart, storeItems, orders}}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
      </ShoppingCartContext.Provider>
    );
}

export {ShoppingCartContext, ShoppingCartProvider, useShoppingCart}