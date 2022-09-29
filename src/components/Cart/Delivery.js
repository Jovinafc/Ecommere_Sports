import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

const Delivery = ({ totalPrice, checkOut }) => {
  const [free, setFree] = useState('free');
  const [date, setDate] = useState('');

  const handleChange = (e) => {
    setFree((current) => {
      if (current === 'free') {
        return 'notfree';
      } else {
        return 'free';
      }
    });
  };

  useEffect(() => {
    let d;
    if (free === 'free') {
      d = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);
    } else {
      d = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
    }
    let day = d.getDate();
    const month = d.toLocaleString('default', { month: 'long' });
    let dateString = day + '-' + month;
    setDate(dateString);
  }, [free]);

  return (
    <div className='cartDel__del'>
      <p className='cartDel__del--p'>Delivery</p>
      <div className='btngrp'>
        <ToggleButtonGroup value={free} exclusive onChange={handleChange}>
          <ToggleButton value='free'>Free</ToggleButton>
          <ToggleButton value='notfree'>Express: Rs: 100</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <Typography style={{ color: 'gray' }} sx={{ fontSize: 12, marginTop: 1 }}>
        Delievery Date: {date}, 2022
      </Typography>

      <hr className='hr' />

      <div className='promodiv'>
        <input className='promoText' type='text' />
        <input type='submit' className='applyBtn' value='Apply' />
      </div>

      <Typography style={{ color: 'gray' }} sx={{ fontSize: 12, marginTop: 1 }}>
        10% off discount
      </Typography>
      <hr className='hr' />

      <div>
        <div className='subtotal'>
          <p className='cartDel__del--p'>Subtotal</p>
          <p className='cartDel__del--p'>
            <b>Rs. {totalPrice}</b>
          </p>
        </div>

        <div className='subtotal'>
          <Typography
            style={{ color: 'gray' }}
            sx={{ fontSize: 12, marginTop: 1 }}
          >
            Discount
          </Typography>

          <Typography
            style={{ color: 'gray' }}
            sx={{ fontSize: 12, marginTop: 1 }}
          >
            (10%) - Rs. {(totalPrice / 100) * 10}
          </Typography>
        </div>

        <div className='subtotal'>
          <Typography
            style={{ color: 'gray' }}
            sx={{ fontSize: 12, marginTop: 1 }}
          >
            Delivery
          </Typography>
          {free === 'free' ? (
            <Typography
              style={{ color: 'gray' }}
              sx={{ fontSize: 12, marginTop: 1 }}
            >
              Rs 0.00
            </Typography>
          ) : (
            <Typography
              style={{ color: 'gray' }}
              sx={{ fontSize: 12, marginTop: 1 }}
            >
              Rs 100
            </Typography>
          )}
        </div>

        <div className='subtotal'>
          <Typography
            style={{ color: 'gray' }}
            sx={{ fontSize: 12, marginTop: 1 }}
          >
            Tax
          </Typography>

          <Typography
            style={{ color: 'gray' }}
            sx={{ fontSize: 12, marginTop: 1 }}
          >
            + Rs. {(totalPrice / 100) * 5}
          </Typography>
        </div>
      </div>

      <hr className='hr' />

      <div>
        <div className='subtotal'>
          <p className='cartDel__del--p'>Total</p>
          <p className='cartDel__del--p'>
            {free === 'free' ? (
              <b>
                Rs.{' '}
                {totalPrice + (totalPrice / 100) * 5 - (totalPrice / 100) * 10}
              </b>
            ) : (
              <b>
                Rs.{' '}
                {totalPrice +
                  100 +
                  (totalPrice / 100) * 5 -
                  (totalPrice / 100) * 10}
              </b>
            )}
          </p>
        </div>

        <Button
          sx={{ width: '100%', marginBottom: '1rem' }}
          variant='contained'
          onClick={() => checkOut()}
        >
          Proceed to Checkout
        </Button>

        <Button
          sx={{ backgroundColor: 'white', color: 'black', width: '100%' }}
          variant='contained'
        >
          Continue shopping
        </Button>
      </div>
    </div>
  );
};

export default Delivery;
