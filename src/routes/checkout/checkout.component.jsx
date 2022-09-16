import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import './checkout.styles.scss';

const Checkout = () => {
    const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext);
    return (
        <div className="checkout-items-container">
            <div className="checkout-Items">
                {
                    cartItems.length? (
                        cartItems.map((item) => {
                            const {id, name, quantity, price, imageUrl} = item;
                            return (
                            <div className="checkout-Item" key={id}>
                                <img src={imageUrl} alt={`${name}`}/>
                                <span className="checkout-text">{name} {quantity}</span>
                                <p><span onClick={() => addItemToCart(item)}>+</span>&nbsp;{price}&nbsp;<span onClick={() => removeItemFromCart(item)}>-</span></p>
                            </div>)
                        })
                    ): (
                        <p>Your have no items to complete checkout.</p>
                    )
                }
            </div>
        </div>
    )
}

export default Checkout;