import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => {

    const {name, price, imageUrl, quantity} = cartItem

    const {reduceCartItem, addItemToCart, removeCartItem} = useContext(CartContext)

    const handleItemDecrement = () => (
        reduceCartItem(cartItem)
    )

    const handleItemIncrement = () => (
        addItemToCart(cartItem)
    )

    const handleRemoveItem = () => (
        removeCartItem(cartItem)
    )

    return(
            <div className='checkout-item-container'>
                <div className='image-container'>
                    <img src={imageUrl} alt={`${name}`}/>
                </div>
                <span className='name'>{name}</span>
                <span className='quantity'>
                    <div onClick={handleItemDecrement} className='arrow'>
                        &#10094;
                    </div>
                    <span className='value'>{quantity}</span>
                    <div onClick={handleItemIncrement} className='arrow'>
                        &#10095;
                    </div>
                </span>
                <span className='price'>{(quantity * price)}</span>
                <div className='remove-button' onClick={handleRemoveItem}>&#10005;</div>
            </div>
    )
}

export default CheckoutItem