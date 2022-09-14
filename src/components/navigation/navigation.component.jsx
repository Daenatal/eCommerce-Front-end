import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as ShopLogo } from '../../assets/umbrella.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils'

import './navigation.styles.scss';
const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    // const signOutHandler = async () => {
    //     await signOutUser();
    //     setCurrentUser(null);
    // }
    //console.log(currentUser);
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <ShopLogo class='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser? (
                            <span className='nav-link' onClick={signOutUser}> SIGN OUT</span>
                            ) : ( 
                            <Link className='nav-link' to='/auth'>
                            SIGN IN
                            </Link>
                        )
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropDown />}
            </div>
            <Outlet />
        </Fragment>  
    );
  };

  export default Navigation;