import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { CartContext } from "../../contexts/cart.context"

import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"
import CartItem from "../cart-item/cart-item.component"

import { CartDropdownContainer, EmptyMessage, CartItemsContainer } from "./cart-dropdown.styles"

const CartDropdown = () => {

    const {cartItems} = useContext(CartContext)
    const navigate = useNavigate()

    const gotToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {cartItems.length ? (
                    cartItems.map((item) => (<CartItem key={item.id} cartItem={item}/>))
                ) : (<EmptyMessage>Your cart is empty</EmptyMessage>)}
            </CartItemsContainer>
            <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={gotToCheckoutHandler}>Go To Checkout</Button>            
        </CartDropdownContainer>
    )
}

export default CartDropdown