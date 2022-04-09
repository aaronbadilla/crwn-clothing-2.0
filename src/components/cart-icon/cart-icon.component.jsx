import { useContext } from 'react'

import { CartContext} from '../../contexts/cart.context'

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'

const CartIcon = () => {

    const {toggleCart, setToggleCart, totalCartQuantity} = useContext(CartContext)


    const handleToggle = () => setToggleCart(!toggleCart)


    return (
        <div onClick={handleToggle} className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{totalCartQuantity}</span>
        </div>
    )
}

export default CartIcon