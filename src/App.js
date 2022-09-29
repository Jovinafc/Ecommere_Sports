import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import Product from './components/Product/Product';
import ProductView from './components/Product/ProductView';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { useStateValue } from './StateProvider';
import Orders from './components/Orders/Orders';
import Cart from './components/Cart/Cart';
import AlertUI from './components/UI/Alert';
import Success from './components/Orders/Success';
import Cancel from './components/Orders/Cancel';
import Profile from './components/Profile/Profile';

function App() {
  const [{ isAuthenticated, user }, dispatch] = useStateValue();

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      dispatch({
        type: 'LOADUSER',
      });
    }
  }, []);

  return (
    <div className='App'>
      <Header />
      <AlertUI />
      {user?.user.role === 'user' || user === null ? (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Product />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      )}

      {/* <Product />
      <ProductView /> */}
    </div>
  );
}

export default App;
