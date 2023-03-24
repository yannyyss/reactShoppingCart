import React from 'react'
import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../../context/ShoppinCartContext'
import { formatCurrency } from '../../utilities/formatCurrency'
import items from '../../data/items.json'

type CartItemProps = {
    id: number,
    quantity: number
}

function CartItem({id, quantity}: CartItemProps) {

    const {increaseItemQuantity, decreaseItemQuantity, removeItemFromCart} = useShoppingCart()

    const item = items.find(i => i.id === id)
    if (item === null || undefined) return null

    return <>
    {item && <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
        <img src={item?.imgUrl} style={{width: '125px', height: '75px', objectFit: 'cover'}}/>
        <div className='me-auto'>
            <div className='ms-2'>
                {item.name}{' '}
                {quantity > 1 && <span className='text-muted' style={{fontSize: '.85rem'}}>X{quantity}</span>}
            </div>
            <div className='text-muted ms-2'>
                {formatCurrency(item.price)}
            </div>
            <div>
                <Button onClick={() => increaseItemQuantity(item.id)} size='sm' className='ms-2'>+</Button>
                <Button onClick={() => decreaseItemQuantity(item.id)} size='sm' className='ms-2'>-</Button>
            </div>
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
        <Button variant='outline-danger' size='sm' onClick={() => removeItemFromCart(id)}>X</Button>
    </Stack>}
    </>
}

export default CartItem