import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useShoppingCart } from '../../context/ShoppinCartContext'
import { formatCurrency } from '../../utilities/formatCurrency'

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

function StoreItem({id, name, price, imgUrl}: StoreItemProps ) {

    const {getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItemFromCart} = useShoppingCart()
    
    const quantity = getItemQuantity(id)

    return (
        <Card className='h-100'>
            <Card.Img src={imgUrl} variant='top' height='200px' style={{objectFit: 'cover'}}/>
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between align-items-baseline'>
                    <span className='fs-2'>{name}</span>
                    <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
                </Card.Title>
                <div className='mt-auto'>
                    {(quantity === 0) ? <Button className='w-100' onClick={() => increaseItemQuantity(id)}>+ Add to cart</Button> : 
                    <div className='d-flex flex-column align-items-center' style={{gap: '.5rem'}}>
                        <div className='d-flex justify-content-center align-items-center' style={{gap: '.5rem'}}>
                            <Button onClick={() => decreaseItemQuantity(id)}>-</Button>
                            <div>
                                <span className='fs-3'>{quantity} </span>
                                in cart
                            </div>
                            <Button onClick={() => increaseItemQuantity(id)}>+</Button>
                        </div>
                        <Button onClick={() => removeItemFromCart(id)} variant='danger' size='sm'>Remove</Button>
                    </div>}
                </div>
            </Card.Body>
        </Card>
    )
}

export default StoreItem