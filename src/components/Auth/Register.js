import { Button, Snackbar, TextField } from '@mui/material';
import './Register.scss';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import axios from '../../axios';
import Alert from '../UI/Alert';
import { useStateValue } from '../../StateProvider';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const [{ isAuthenticated }, dispatch] = useStateValue();

  const submitBtn = () => {
    if (password !== confirmpassword) {
      dispatch({
        type: 'SET_ALERT',
        severity: 'error',
        alertMsg: "Passwords don't match",
      });
    } else {
      let role = 'user';
      if (name === 'admin') {
        role = 'admin';
      }
      axios
        .post('/register', {
          name,
          email,
          password,
          role,
        })
        .then((resp) => {
          dispatch({
            type: 'SET_ALERT',
            severity: 'success',
            alertMsg: 'User Registered Successfully.',
          });
          setName('');
          setEmail('');
          setPassword('');
          setConfirmpassword('');
        })
        .catch((err) => {
          dispatch({
            type: 'SET_ALERT',
            severity: 'error',
            alertMsg: err.response.data.msg,
          });
        });
    }
  };

  return (
    <div className='register'>
      <div className='leftDiv'>
        <h1 className='head'>Welcome Back!</h1>
        <LoginIcon />
        <p>
          Already registered before?Kindly login to check the amazing set of
          products
        </p>
        <NavLink to='/login'>
          <button className='ghost'>SIGN IN</button>
        </NavLink>
      </div>
      <div className='formReg'>
        <h1>Sign Up</h1>
        <div>
          <TextField
            size='small'
            label='Name'
            variant='filled'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            type='password'
            value={password}
            variant='filled'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <TextField
            value={confirmpassword}
            size='small'
            label='Confirm Password'
            type='password'
            variant='filled'
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
        </div>

        <div>
          <p style={{ visibility: 'hidden' }}>Reg</p>
        </div>

        <div>
          <button className='regBtn' onClick={submitBtn} variant='contained'>
            Register
          </button>
          <Alert />
        </div>
      </div>
    </div>
  );
};

export default Register;
