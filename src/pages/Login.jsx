import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import AuthContext from '../context/auth/AuthContext';
import { login, handleGithubLogin } from '../context/auth/AuthActions';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const { message, dispatch } = useContext(AuthContext);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(auth, email, password, dispatch, navigate);
  };

  const handleSocialLogin = async () => {
    await handleGithubLogin(navigate, dispatch);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE',
      });
    }, 5000);
  }, [dispatch]);

  return (
    <div className='w-96 flex flex-col justify-center mx-auto'>
      <div className='mb-6'>
        <h3 className='font-semibold text-2xl text-white-800'>Sign In </h3>
        <p className='text-white-500'>Please sign in to your account.</p>
      </div>
      <div className='mt-3'>
        <button
          type='submit'
          onClick={handleSocialLogin}
          className='w-full flex justify-center btn btn-warning gap-2 p-3 rounded-lg tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500'
        >
          <svg
            fill='#000000'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24px'
            height='24px'
          >
            {' '}
            <path d='M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z' />
          </svg>
          Sign in Using Github
        </button>
      </div>
      <div class='divider'>OR</div>
      <form onSubmit={handleSubmit}>
        <div className='space-y-3'>
          <div className='space-y-2'>
            <label className=' font-medium text-white-700 tracking-wide'>
              Email
            </label>
            <input
              className='w-full text-base text-gray-700 px-4 py-2 border border-white-300 rounded-md focus:outline-none focus:border-purple-400'
              type='email'
              placeholder='mail@gmail.com'
              onChange={onChange}
              name='email'
            />
          </div>
          <div className='space-y-2'>
            <label className='mb-5 font-medium text-white-700 tracking-wide'>
              Password
            </label>
            <input
              className=' w-full text-base text-gray-700 px-4 py-2 border  border-white-300 rounded-md focus:outline-none focus:border-purple-400'
              type='password'
              placeholder='Enter your password'
              onChange={onChange}
              name='password'
            />
            <label className='label mt-0'>
              <span id='error-message' className='label-text-alt text-error'>
                {message}
              </span>
            </label>
          </div>
        </div>
        <div className='mt-5'>
          <button
            type='submit'
            className='w-full flex justify-center btn btn-primary p-3 rounded-lg tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500'
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
