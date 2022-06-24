import {createContext, useState, useEffect} from 'react'

const removeCartItems = (cartItems, productToRemove) => {

    return cartItems.filter((cartItem) => {
         return productToRemove.id !== cartItem.id
     })
 }

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

const reduceCartItems = (cartItems, productToRemove) => {
        return cartItems.map((cartItem) => 
            cartItem.id === productToRemove.id 
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem)
}

export const CartContext = createContext({
    toggleCart: false,
    setToggleCart: () => {},
    cartItems: [],
    addItemToCart: () => {},
    reduceCartItem: () => {},
    removeCartItem: () => {},
    totalCartQuantity: 0,
    totalCartPrice: 0,
});

export const CartProvider = ({children}) => {
    const [toggleCart, setToggleCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalCartQuantity, setTotalCartQuantity] = useState(0)
    const [totalCartPrice, setTotalCartPrice] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setTotalCartQuantity(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartPrice = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
        setTotalCartPrice(newCartPrice)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItems(cartItems, productToAdd))
    }

    const reduceCartItem = (productToRemove) => {
        if (productToRemove.quantity <= 1) {
            setCartItems(removeCartItems(cartItems, productToRemove))
        }
        if (productToRemove.quantity > 1) {
            setCartItems(reduceCartItems(cartItems, productToRemove))
        }
    }

    const removeCartItem = (productToRemove) => {
        setCartItems(removeCartItems(cartItems, productToRemove))
    }

    const value = {toggleCart, setToggleCart, cartItems, setCartItems, addItemToCart, totalCartQuantity, setTotalCartQuantity, reduceCartItem, removeCartItem, totalCartPrice}

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};