import React, { useState } from 'react';
import './Product.css';
import axios from 'axios';
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useStateValue } from '../../StateProvider';
import Alert from '../UI/Alert';

const Product = () => {
  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [price, setPrice] = useState(0);

  const [category, setCategory] = useState('');

  const [units, setUnits] = useState(0);

  const [image, setImage] = useState();

  const [imageData, setImageData] = useState('');

  const [loader, setLoader] = useState(false);
  const [{}, dispatch] = useStateValue();

  const onAdd = (e) => {
    e.preventDefault();
    console.log('Button Clicked');
    setLoader(true);
    let formObj = new FormData();
    formObj.append('title', title);
    formObj.append('description', description);
    formObj.append('price', price);
    formObj.append('category', category);
    formObj.append('units', units);
    formObj.append('image', image);
    console.log(formObj);
    try {
      axios.post('/add-product', formObj).then((response) => {
        console.log(response.data);
        setLoader(false);
        dispatch({
          type: 'SET_ALERT',
          severity: 'success',
          alertMsg: 'Product Added',
        });
      });
    } catch (error) {
      console.log(error);
      setLoader(false);
      dispatch({
        type: 'SET_ALERT',
        severity: 'error',
        alertMsg: 'Product Not Added',
      });
    }
  };

  const uploadImageHandler = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setImageData(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className='product'>
      <h3>Add a Product</h3>
      <form className='form' encType='multipart/form-data'>
        <div>
          <TextField
            size='small'
            label='Name'
            variant='filled'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <TextField
            size='small'
            label='Description'
            multiline
            fullWidth
            rows={2}
            variant='filled'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='form__div'>
          <TextField
            size='small'
            variant='filled'
            label='Category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <TextField
            size='small'
            variant='filled'
            value={price}
            label='Price'
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            size='small'
            variant='filled'
            value={units}
            label='Units'
            onChange={(e) => setUnits(e.target.value)}
          />
        </div>

        <div className='imageDiv'>
          <img src={imageData} height='200' width='200' />
          <TextField
            size='small'
            variant='filled'
            type='file'
            onChange={(e) => uploadImageHandler(e)}
          />
        </div>

        <div>
          <button onClick={onAdd}>Add Product</button>
          {loader ? <CircularProgress /> : null}
          <Alert />
        </div>
      </form>
    </div>
  );
};

export default Product;
