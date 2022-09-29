import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:4000',
  baseURL: 'https://ecommerce-14jvn.herokuapp.com/',
});

export const setAuthToken = (token) => {
  console.log(token);
  if (token) {
    instance.defaults.headers.common['auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['auth-token'];
  }
};

export default instance;
