import { useContext } from 'react'

import { ToggleCartContext} from '../../contexts/toggle-cart.context'

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'

const CartIcon = () => {

    const {toggleCart, setToggleCart} = useContext(ToggleCartContext)


    const handleToggle = () => setToggleCart(!toggleCart)


    return (
        <div onClick={handleToggle} className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>10</span>
        </div>
    )
}

export default CartIcon