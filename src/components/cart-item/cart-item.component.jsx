import './cart-item.styles.jsx'
import { CartItemsContainer, ItemDetails, ItemImage, ItemName, ItemPrice } from './cart-item.styles.jsx'
const CartItem = ({cartItem}) => {

    const {name, imageUrl, price, quantity} = cartItem 

    return(
        <CartItemsContainer>
            <ItemImage src={imageUrl} alt={`${name}`}/>
            <ItemDetails>
                <ItemName>{name}</ItemName>
                <ItemPrice>
                {quantity} x ${price}
                </ItemPrice>
            </ItemDetails>
        </CartItemsContainer>
    )
}

export default CartItem