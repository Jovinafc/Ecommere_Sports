import React from 'react';
import './Card.css';
import Card from '@mui/material/Card';
import { Button, CardContent, CardMedia, Typography } from '@mui/material';
import { useStateValue } from '../../StateProvider';
import { setAuthToken } from '../../axios';
import axios from '../../axios';

const CardComponent = ({ product }) => {
  const [{ isAuthenticated, user }, dispatch] = useStateValue();
  const { _id, title, description, category, price, image } = product;

  const addCart = () => {
    if (!isAuthenticated) {
      dispatch({
        type: 'SET_ALERT',
        severity: 'error',
        alertMsg: 'Kindly login to add the product',
      });
    } else {
      setAuthToken(user.token);
      axios
        .post('/add-cart', {
          product_id: _id,
          price: price,
          count: 1,
          name: title,
          description: description,
          image: image,
        })
        .then((data) => {
          console.log(data);
          dispatch({
            type: 'SET_ALERT',
            severity: 'success',
            alertMsg: data.data.msg,
          });
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    }
  };

  return (
    <div className='card'>
      <img className='image' src={image} />
      <div className='title'>
        <h4>{title}</h4>
        <p>Rs: {price} /-</p>
      </div>
      <div className='description'>{description}</div>

      <div className='twoButton'>
        <Button
          sx={{ marginRight: '1rem' }}
          variant='contained'
          onClick={addCart}
        >
          Add to Cart
        </Button>
        <Button variant='outlined'>Buy</Button>
      </div>
    </div>
  );
};

export default CardComponent;
