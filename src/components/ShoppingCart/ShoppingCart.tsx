import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../../context/ShoppinCartContext'
import { formatCurrency } from '../../utilities/formatCurrency'
import CartItem from '../CartItem/CartItem'
import items from '../../data/items.json'

type ShoppingCartProps = {
    isOpen: boolean
}

function ShoppingCart({isOpen}: ShoppingCartProps) {

    const {closeCart, cartItems} = useShoppingCart()

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3} >
                    {cartItems.map((item,i) => <CartItem key={i} {...item}/>)}
                </Stack>
                <div className='ms-auto fw-bold fs-5'>
                    Total: {formatCurrency(
                        cartItems.reduce((total,cartItem) => {
                            const item = items.find(i => i.id === cartItem.id)
                            return total + (item?.price || 0) * cartItem.quantity
                        },0)
                    )}
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShoppingCart