import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { backendUrl, setToken, navigate } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log('Login Error:', error);
      if (error.response) {
        toast.error(error.response.data?.message || 'Network error');
      } else if (error.request) {
        toast.error('No response from server');
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-full sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Sign Up' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
      />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        )}
      </div>
      <button type='submit' className='w-full text-white bg-black py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;