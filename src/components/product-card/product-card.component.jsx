import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';

import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product); //better to create it in the component than on the button, provides readibility, easier to optimize

        return (<div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to card</Button>
        </div>);
};

export default ProductCard;