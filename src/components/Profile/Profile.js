import { TextField, Button } from '@mui/material';
import axios, { setAuthToken } from '../../axios';
import React, { useState, useEffect } from 'react';
import './Profile.scss';
import { useStateValue } from '../../StateProvider';

const Profile = () => {
  const [{ isAuthenticated, user }, dispatch] = useStateValue();

  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState();
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    setAuthToken(user?.token);
    axios
      .get('/get-myprofile')
      .then((res) => {
        console.log(res.data);
        const { age, address, city, country, state, phone, profile_image } =
          res.data;
        setAge(age);
        setAddress(address);
        setCity(city);
        setCountry(country);
        setPhone(phone);
        setState(state);
        setImageData(profile_image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const uploadImageHandler = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setImageData(URL.createObjectURL(e.target.files[0]));
  };

  const onUpdate = (e) => {
    e.preventDefault();
    let formObj = new FormData();
    formObj.append('age', age);
    formObj.append('address', address);
    formObj.append('state', state);
    formObj.append('country', country);
    formObj.append('phone', phone);
    formObj.append('profile_image', image);
    try {
      setAuthToken(user.token);
      axios.post('/add-profile', formObj).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='profileCont'>
      <p className='profileCont__P'>Profile</p>

      <div className='profile__form'>
        <div className='profile__form-img'>
          <img src={imageData} height='300' width='300' />
          <TextField
            size='small'
            variant='filled'
            type='file'
            InputProps={{
              className: 'image_input',
            }}
            onChange={(e) => uploadImageHandler(e)}
          />
        </div>

        <div className='profile__formCont'>
          <div className='profile__formCont-one'>
            <div style={{ gridArea: 'age' }}>
              <TextField
                size='small'
                label='Age'
                variant='filled'
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div style={{ gridArea: 'phone' }}>
              <TextField
                size='small'
                label='Phone'
                variant='filled'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className='profile__formCont-two'>
            <div style={{ gridArea: 'country' }}>
              <TextField
                size='small'
                label='Country'
                variant='filled'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div style={{ gridArea: 'state' }}>
              <TextField
                size='small'
                label='State'
                variant='filled'
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div style={{ gridArea: 'city' }}>
              <TextField
                size='small'
                label='City'
                variant='filled'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <div className='profile__formCont-three'>
            <div style={{ gridArea: 'address' }}>
              <TextField
                size='small'
                label='Address'
                multiline
                fullWidth
                rows={2}
                variant='filled'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className='profile__formCont-four'>
            <Button
              sx={{ marginRight: '1rem' }}
              variant='contained'
              onClick={onUpdate}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
