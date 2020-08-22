import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../Provider/Auth';
import DotLoader from '../../components/Loaders/DotLoader';

const Signup = () => {
  const { register, handleSubmit, errors } = useForm();
  const {
    isLoading,
    authenticate,
    errors: authErrors,
    clearErrors,
  } = useAuth();

  const onSubmit = (data: any) => {
    authenticate({ ...data, mode: 'signup' });
  };

  useEffect(() => {
    return function cleanup() {
      clearErrors();
    };
  }, []);

  return (
    <div
      className='auth__div'
      style={isLoading ? { pointerEvents: 'none', opacity: '0.8' } : {}}
    >
      <img
        alt='Market Sight'
        src={require('../../assets/img/logo-dark.png')}
        className='auth__logo'
      />
      <span className='auth__welcome'>Sign Up</span>
      {authErrors.auth ? (
        <p className='auth__error'>
          <img src={require('../../assets/img/error.png')} alt='Error' />
          {authErrors.auth}
        </p>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='auth__input-row'>
            <label className='auth__label'>Email</label>
            <span className='auth__input-error'>
              {errors.email && errors.email.message}
            </span>
          </div>
          <input
            name='email'
            ref={register({
              required: 'Email is required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className='auth__input'
            type='email'
            placeholder='warrenbuffet@gmail.com'
            style={{
              border: errors.email
                ? '1px solid #bf1616'
                : '1px solid transparent',
            }}
          />
        </div>
        <div>
          <div className='auth__input-row'>
            <label className='auth__label'>Username</label>
            <span className='auth__input-error'>
              {errors.username && errors.username.message}
            </span>
          </div>
          <input
            ref={register({
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters.',
              },
              required: 'Username is required.',
            })}
            className='auth__input'
            type='text'
            name='username'
            placeholder='warrenbuffet'
            style={{
              border: errors.username
                ? '1px solid #bf1616'
                : '1px solid transparent',
            }}
          />
        </div>
        <div>
          <div className='auth__input-row'>
            <label className='auth__label'>Password</label>
            <span className='auth__input-error'>
              {errors.password && errors.password.message}
            </span>
          </div>
          <input
            ref={register({
              minLength: {
                value: 5,
                message: 'Password must be at least 5 characters.',
              },
              required: 'Password is required.',
            })}
            name='password'
            className='auth__input'
            placeholder='Password'
            type='password'
            style={{
              border: errors.password
                ? '1px solid #bf1616'
                : '1px solid transparent',
            }}
          />
        </div>
        <span className='auth__text'>
          Already have an account?{' '}
          <Link to='/login' className='switch'>
            Sign In.
          </Link>
        </span>

        <button className='auth__btn' disabled={isLoading}>
          {isLoading ? <DotLoader /> : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
