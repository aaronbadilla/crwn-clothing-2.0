import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import { CheckoutItemContainer, ImageContainer, Image, Name, Quantity, Arrow, Value, Price, RemoveButton } from './checkout-item.styles.jsx'

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
            <CheckoutItemContainer>
                <ImageContainer>
                    <Image src={imageUrl} alt={`${name}`}/>
                </ImageContainer>
                <Name>{name}</Name>
                <Quantity>
                    <Arrow onClick={handleItemDecrement}>
                        &#10094;
                    </Arrow>
                    <Value>{quantity}</Value>
                    <Arrow onClick={handleItemIncrement}>
                        &#10095;
                    </Arrow>
                </Quantity>
                <Price>{(quantity * price)}</Price>
                <RemoveButton onClick={handleRemoveItem}>&#10005;</RemoveButton>
            </CheckoutItemContainer>
    )
}

export default CheckoutItem