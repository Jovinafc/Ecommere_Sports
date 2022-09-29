import React, { useEffect, useState } from 'react';
import './Orders.scss';
import { useStateValue } from '../../StateProvider';
import OrderItem from './OrderItem';
import axios, { setAuthToken } from '../../axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [{ isAuthenticated, user }, dispatch] = useStateValue();

  useEffect(() => {
    setAuthToken(user?.token);
    axios
      .get('/get-orders')
      .then((data) => {
        console.log(data.data);
        setOrders(data.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  }, [user?.token]);

  return (
    <div className='orderCont'>
      <p className='orderCont__p'>Orders</p>
      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      ) : (
        <div className='emptyOrders'>
          No orders done so far, try shopping with us.
        </div>
      )}
    </div>
  );
};

export default Orders;
