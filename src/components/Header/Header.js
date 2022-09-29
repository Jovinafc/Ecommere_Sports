import React from 'react';
import './Header.css';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useScrollDirection } from './useScrollDirection';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Header = () => {
  const scrollDirection = useScrollDirection();
  const [{ isAuthenticated, user }, dispatch] = useStateValue();
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <header
    //  className={`${scrollDirection === 'down' ? '' : 'show'}`}
    >
      <NavLink to='/' className='navlink'>
        <h2 className='h22'>Sportsy</h2>
      </NavLink>
      <div className='header__menu'>
        {isAuthenticated ? (
          <div className='header__loggedin'>
            <div className='header__greet'>
              <h5>Hello, {user.user.name.split(' ')[0]}</h5>
            </div>

            <div>
              <NavLink to='/profile' className='navlink header__item'>
                <AccountBoxIcon color='primary' />
                <p className='logout'>Profile</p>
              </NavLink>
            </div>

            <div>
              <NavLink to='/orders' className='navlink header__item'>
                <ListAltIcon color='primary' />
                <p className='logout'>Orders</p>
              </NavLink>
            </div>

            <div>
              <NavLink className='navlink header__item' to='/cart'>
                <ShoppingCartIcon color='primary' />
                <p className='logout'>Cart</p>
              </NavLink>
            </div>

            <div>
              <Button size='small' className='header__item' onClick={logout}>
                <LogoutIcon />
                <p className='logout'>Logout</p>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <NavLink className='navlink' to='/login'>
              <Button size='small'>Login</Button>
            </NavLink>

            <NavLink className='navlink' to='/register'>
              <Button>Register</Button>
            </NavLink>
          </div>
        )}

        {/* {isAuthenticated ? (
          <>
            <h5>Hello, {user.user.name.split(' ')[0]}</h5>
            <NavLink to='/orders'>
              <ListAltIcon color='primary' />
              <p className='logout'>Orders</p>
            </NavLink>
          </>
        ) : null}
        <NavLink className='navlink' to='/cart'>
          <ShoppingCartIcon color='primary' />
          <p className='logout'>Cart</p>
        </NavLink>
        {isAuthenticated ? (
          <Button size='small' onClick={logout}>
            <LogoutIcon />
            <p className='logout'>Logout</p>
          </Button>
        ) : (
          <>
            <NavLink className='navlink' to='/login'>
              <Button size='small'>Login</Button>
            </NavLink>

            <NavLink className='navlink' to='/register'>
              <Button>Register</Button>
            </NavLink>
          </>
        )} */}
      </div>
    </header>
  );
};

export default Header;
