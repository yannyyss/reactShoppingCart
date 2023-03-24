import { createContext, ReactNode, useContext, useState } from 'react'
import ShoppingCart from '../components/ShoppingCart/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

type ShoppinCartContextProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppinCartContext = {
    getItemQuantity: (id: number) => number
    increaseItemQuantity: (id: number) => void
    decreaseItemQuantity: (id: number) => void
    removeItemFromCart: (id: number) => void
    openCart: () => void
    closeCart: () => void
    cartItems: CartItem[]
    cartQuantity: number
}

const ShoppinCartContext = createContext({} as ShoppinCartContext)

export function useShoppingCart() {
    return useContext(ShoppinCartContext)
}

export function ShoppinCartContextProvider({children}:ShoppinCartContextProviderProps) {
    
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart',[])
    const [isOpen, setIsOPen] = useState(false)

    const openCart = () => setIsOPen(true)
    const closeCart = () => setIsOPen(false)

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseItemQuantity(id: number) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, {id: id, quantity: 1}]
            } else {
                return currentItems.map(item => item.id === id ? {...item, quantity: item.quantity++}: item)
            }
        })
    }

    function decreaseItemQuantity(id: number) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => item.id === id ? {...item, quantity: item.quantity--}: item)
            }
        })
    }

    function removeItemFromCart(id: number) {
        setCartItems(currentItems => currentItems.filter(item => item.id !== id))
    }

    return <ShoppinCartContext.Provider value={{ openCart, closeCart, cartItems, cartQuantity, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItemFromCart}}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppinCartContext.Provider>
}