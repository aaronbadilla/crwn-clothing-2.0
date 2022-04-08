import {createContext, useState} from 'react'

export const ToggleCartContext = createContext({
    toggleCart: false,
    setToggleCart: () => {}
});

export const ToggleCartProvider = ({children}) => {
    const [toggleCart, setToggleCart] = useState(false)
    const value = {toggleCart, setToggleCart}

    return <ToggleCartContext.Provider value={value}>{children}</ToggleCartContext.Provider>
};