import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';


import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { addItemToCart, removeItemFromCart, removeSpecificCartItem } = useContext(CartContext);

    const clearItemHandler = () => removeSpecificCartItem(cartItem);
    const addQuantityHandler = () => addItemToCart(cartItem);
    const removeQuantityHandler = () => removeItemFromCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={addQuantityHandler}>
                 &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={removeQuantityHandler}>
                  &#10095;  
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
    )

}

export default CheckoutItem;