import { Fragment, useContext } from 'react'
import { Outlet } from 'react-router-dom';

import { ReactComponent as ShopLogo } from '../../assets/umbrella.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils'

import {NavigationContainer, NavLinks, LogoContainer, LinkContainer} from './navigation.styles';

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
            <NavigationContainer>
                <LogoContainer to='/'>
                    <ShopLogo class='logo' />
                </LogoContainer>
                <NavLinks>
                    <LinkContainer to='/shop'>
                        SHOP
                    </LinkContainer>
                    {
                        currentUser? (
                            <LinkContainer as='span' onClick={signOutUser}> SIGN OUT</LinkContainer>
                            ) : ( 
                            <LinkContainer to='/auth'>
                            SIGN IN
                            </LinkContainer>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropDown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>  
    );
  };

  export default Navigation;