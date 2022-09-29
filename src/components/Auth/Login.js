import React, { useState } from 'react';
import './Login.scss';
import { Button, TextField } from '@mui/material';
import { Navigate, NavLink } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Alert from '../UI/Alert';
import axios from '../../axios';
import { useStateValue } from '../../StateProvider';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [{ isAuthenticated }, dispatch] = useStateValue();

  const submitBtn = () => {
    setLoader(true);
    axios
      .post('/login', {
        email,
        password,
      })
      .then((data) => {
        dispatch({
          type: 'LOGIN',
          user: data.data,
        });
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        dispatch({
          type: 'SET_ALERT',
          severity: 'error',
          alertMsg: err.response.data.msg,
        });
      });
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='login'>
      <div className='formLog'>
        <h1>Sign In</h1>
        <div>
          <TextField
            size='small'
            label='Email'
            variant='filled'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            size='small'
            label='Password'
            variant='filled'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <p style={{ color: 'gray' }}>Forgot your password?</p>
        </div>

        <div>
          <button
            disabled={email === '' || password === ''}
            className='loginBtn'
            onClick={submitBtn}
            variant='contained'
          >
            Sign In
          </button>
          {/* <Alert /> */}
        </div>

        <div style={{ marginTop: '1rem' }}>
          {loader ? <CircularProgress /> : null}
        </div>
      </div>
      <div className='rightDiv'>
        <h1 className='head'>Hello, Friend!</h1>
        <AppRegistrationIcon />
        <p>
          Not registered before? Register and start your shopping journey with
          us.
        </p>
        <NavLink to='/register'>
          <button className='ghost'>SIGN UP</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
