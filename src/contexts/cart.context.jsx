import { createContext, useReducer } from 'react';

import {createAction} from '../utils/reducer/reducer.utils';

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
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    removeSpecificCartItem: () => {},
    cartCount: 0,
    total: 0,
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        default: 
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}

const removeCartItem = (cartItems, productToRemove) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id); 

    //check if quantity is equal to 1
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id); //filter out anything that equals false
    }

    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
    {...cartItem, quantity: cartItem.quantity - 1}
        :cartItem
    );
}

const removeSingleCartItem = (cartItems, productToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
}

export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false); instead of these values use cartReducer
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    //     setCartCount(newCartCount);
    // }, [cartItems])

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce(
    //         (total, cartItem) => total + cartItem.quantity * cartItem.price,
    //         0
    //     );
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);

    const updateCartItemsReducer = (newCartItems) => {

        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        dispatch(
            createAction( CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                 cartTotal: newCartTotal, 
                 cartCount: newCartCount
            })
        );
            //{ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}})

        /*
        generate newCartTotal

        generate newCartCount

        dispatch new action with payload = {
            newCartItems,
            newCartTotal,
            newCartCount
        }

        */
    }

    const addItemToCart = (productToAdd) => {
        // instead of setting let's add them to a variable setCartItems(addCartItem(cartItems, productToAdd));
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemFromCart = (productToRemove) => {
        //setCartItems(removeCartItem(cartItems, productToRemove));
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const removeSpecificCartItem = (productToRemove) => {
        //setCartItems(removeSingleCartItem(cartItems, productToRemove));
        const newCartItems = removeSingleCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_IS_CART_OPEN, 
                bool
                )
        );
            //{ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool});
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        cartTotal, 
        removeItemFromCart, 
        removeSpecificCartItem 
    };

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