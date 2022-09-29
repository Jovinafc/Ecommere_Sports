import React, { useEffect, useState } from 'react';
import './Cart.scss';
import axios, { setAuthToken } from '../../axios';
import { useStateValue } from '../../StateProvider';
import { useNavigate, NavLink } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CartCard from './CartCard';
import Delivery from './Delivery';

const Cart = () => {
  const [product, setProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [{ isAuthenticated, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token !== undefined) {
      setAuthToken(user?.token);
      axios
        .get('/get-cart')
        .then((data) => {
          console.log(data.data.cart);
          setProduct(data.data.cart);
          let priceTotal = data.data.cart.reduce(
            (a, v) => (a = a + v.product_price * v.product_count),
            0
          );
          setTotalPrice(priceTotal);
        })
        .catch((err) => {
          if (err.response.data.msg === 'Token is not valid') {
            dispatch({
              type: 'LOGOUT',
            });
            navigate('/login');
          }
        });
    }
  }, [user]);

  const removeFromCart = (id) => {
    // event.preventDefault();
    console.log(id);

    axios
      .delete(`/remove-cart/${id}`)
      .then((data) => {
        setProduct(data.data.cart);
        let priceTotal = data.data.cart.reduce(
          (a, v) => (a = a + v.product_price * v.product_count),
          0
        );
        setTotalPrice(priceTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkOut = () => {
    console.log('Checkout Clicked');
    const orderDetails = {
      product: product,
      totalPrice: totalPrice,
    };
    localStorage.setItem('order', JSON.stringify(orderDetails));
    setAuthToken(user?.token);
    axios
      .post('/create-checkout-session', product)
      .then((data) => {
        console.log(data.data.url);
        window.location.href = data.data.url;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='cartCont'>
      {product.length > 0 ? (
        <div className='cartDel'>
          <div className='cartDel__cart'>
            <p className='cartDel__del--p'>Cart</p>
            {product.map((prod) => (
              <CartCard
                key={prod.product_id}
                delete={removeFromCart}
                prod={prod}
              />
            ))}
          </div>

          <Delivery checkOut={checkOut} totalPrice={totalPrice} />
          {/* 
          <div className='cartDel__del'>Delivery</div> */}
        </div>
      ) : (
        <div className='emptyCart'>
          <p>
            Your Cart is Empty. Try adding{' '}
            <NavLink to='/' className='navlink'>
              <AddShoppingCartIcon className='addicon' />
            </NavLink>
            some products in your cart and get shopping with us.
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
