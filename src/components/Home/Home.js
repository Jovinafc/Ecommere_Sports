import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardComponent from './Card';
import './Home.css';
import axios from '../../axios';
import { useStateValue } from '../../StateProvider';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const [product, setProduct] = useState([]);
  const [{ isAuthenticated }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get('/get-product').then((data) => {
      setProduct(data.data);
    });
  }, []);

  return (
    <>
      {product.length > 0 ? (
        <div className='home__cont'>
          {product.map((p) => (
            <CardComponent key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <div className='home__loader'>
          <div className='home__loader-div'>
            <CircularProgress />
            <p>Loading products...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
