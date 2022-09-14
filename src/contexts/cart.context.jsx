import { createContext, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    //if found, increment quantity

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
        {...cartItem, quantity: cartItem.quantity + 1 }
            :cartItem
        );
    }

    //return new array with modified cartItems/ new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }]; //by the time we make it to this line, all cart items don't match product to add so make a new cart item
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {

    }
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// product { want to store an object similar to a product
//     id,
//     name,
//     price,
//     imageUrl
// }

// cart Item {
//     id,
//     name,
//     price,
//     imageUrl,
//     quantity
// }