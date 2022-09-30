import { CartItemContainer, ImageContainer, ItemDetails, Name } from './cart-item.styles';

const CartItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CartItemContainer>
            <ImageContainer src={imageUrl} alt={`$name`} />
            <ItemDetails>
                <Name as="span">{name}</Name>
                <span className='price'>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;