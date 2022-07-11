import { useContext } from 'react'

import { CartContext} from '../../contexts/cart.context'

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles.jsx'

const CartIcon = () => {

    const {toggleCart, setToggleCart, totalCartQuantity} = useContext(CartContext)
    const handleToggle = () => setToggleCart(!toggleCart)

    return (
        <CartIconContainer onClick={handleToggle}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{totalCartQuantity}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon