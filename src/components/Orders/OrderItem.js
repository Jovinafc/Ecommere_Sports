import React, { useState } from 'react';
import OrderCard from './OrderCard';
import './OrderItem.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const OrderItem = ({ order }) => {
  const [collapse, setCollapse] = useState(true);

  return (
    <div>
      <hr className='hr2' />
      <div className='orderitem__head'>
        <p>#1</p>
        <p>Date: {order.product_details.date.slice(0, 10)}</p>
        <p>No of Products: {order.product_details.products.length}</p>
        <p>Total Amount: Rs.{order.product_details.total_price}</p>
        <p onClick={() => setCollapse(!collapse)}>
          {collapse ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </p>
      </div>
      <div style={{ display: collapse ? 'block' : 'none' }}>
        Product Details
        {order.product_details.products.map((prod) => (
          <OrderCard key={prod.product_id} prod={prod} />
        ))}
      </div>
    </div>
  );
};

export default OrderItem;
