import React, { useEffect } from 'react';
import './Success.css';
import { useStateValue } from '../../StateProvider';

import axios, { setAuthToken } from '../../axios';

const Success = () => {
  const [{ isAuthenticated, user }, dispatch] = useStateValue();

  useEffect(() => {
    if (localStorage.getItem('order')) {
      console.log(JSON.parse(localStorage.getItem('order')));
      let prod = JSON.parse(localStorage.getItem('order'));
      setAuthToken(user?.token);
      const body = {
        productDetails: [...prod.product],
        totalPrice: prod.totalPrice,
      };
      console.log(body);
      axios
        .post('/order', body)
        .then((data) => {
          console.log(data);
          localStorage.removeItem('order');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <div className='success'>
      <h3>Order Placed successfully.</h3>
    </div>
  );
};

export default Success;
