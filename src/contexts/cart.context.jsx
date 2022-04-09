import {createContext, useState, useEffect} from 'react'

const addCartItems = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem)
    } else {
        return [...cartItems, {...productToAdd, quantity:1}]
    }
}

export const CartContext = createContext({
    toggleCart: false,
    setToggleCart: () => {},
    cartItems: [],
    addItemToCart: () => {},
    totalCartQuantity: 0,
});

export const CartProvider = ({children}) => {
    const [toggleCart, setToggleCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalCartQuantity, setTotalCartQuantity] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setTotalCartQuantity(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItems(cartItems, productToAdd))
    }

    const value = {toggleCart, setToggleCart, cartItems, setCartItems, addItemToCart, totalCartQuantity, setTotalCartQuantity}

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};