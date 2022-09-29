import React from 'react';
import '../Cart/CartCard.scss';
import { Button } from '@mui/material';
import axios, { setAuthToken } from '../../axios';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const OrderCard = (props) => {
  const { quantity, description, image, title, price, product_id } = props.prod;

  return (
    <div className='cartCard'>
      <hr className='hr2' />

      <div className='cartCardDiv'>
        <div className='cartCardDiv__image'>
          <img className='cartCardDiv__image-img' src={image} />
        </div>
        <div className='cartCardDiv--content'>
          <div className='content--header'>
            <span className='content--header-h'>
              <h4>{title}</h4>
              {/* <p className='content--header-price'>Rs. {price} </p> */}
              <p className='content--header-desc'>{description}</p>
              <p className='content--header-desc'>Qty: {quantity}</p>
            </span>
            <span className='content--header-right'>
              <h4>Rs. {price}</h4>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
