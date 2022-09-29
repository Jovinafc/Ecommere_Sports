import React from 'react';
import './CartCard.scss';
import { Button } from '@mui/material';
import axios, { setAuthToken } from '../../axios';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const CartCard = (props) => {
  const {
    product_count,
    product_description,
    product_image,
    product_name,
    product_price,
    product_id,
  } = props.prod;

  return (
    <div className='cartCard'>
      <hr className='hr2' />

      <div className='cartCardDiv'>
        <div className='cartCardDiv__image'>
          <img className='cartCardDiv__image-img' src={product_image} />
        </div>
        <div className='cartCardDiv--content'>
          <div className='content--header'>
            <span className='content--header-h'>
              <h4>{product_name}</h4>
              {/* <p className='content--header-price'>Rs. {product_price} </p> */}
              <p className='content--header-desc'>{product_description}</p>
              <p className='content--header-desc'>{product_count}</p>
            </span>
            <span className='content--header-right'>
              <h4>Rs. {product_price}</h4>
              <Button
                sx={{ fontSize: 'x-small' }}
                onClick={() => props.delete(product_id)}
              >
                <RemoveCircleIcon />
                <p style={{ marginLeft: '2px' }}>Remove from Cart</p>
              </Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
