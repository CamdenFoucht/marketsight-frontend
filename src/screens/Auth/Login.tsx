import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Provider/Auth';
import DotLoader from '../../components/Loaders/DotLoader';

const Login = () => {
  const {
    isLoading,
    authenticate,
    errors: authErrors,
    clearErrors,
  } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    authenticate({ ...data, mode: 'login' });
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
      <span className='auth__welcome'>Login</span>
      {authErrors.auth ? (
        <p className='auth__error'>
          <img src={require('../../assets/img/error.png')} alt='error' />
          {authErrors.auth}
        </p>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='auth__input-row'>
            <label className='auth__label'>Email or username</label>
          </div>
          <input
            ref={register}
            name='username'
            className='auth__input'
            type='username'
            placeholder='Warren Buffet'
            defaultValue='visitor'
          />
        </div>
        <div>
          <div className='auth__input-row'>
            <label className='auth__label'>Password</label>
          </div>
          <input
            ref={register}
            name='password'
            className='auth__input'
            placeholder='Password'
            type='password'
            defaultValue='password'
          />
        </div>
        <span className='auth__text'>
          Don't have an account?{' '}
          <Link to='/signup' className='switch'>
            Sign Up.
          </Link>
        </span>

        <button className='auth__btn' disabled={isLoading}>
          {isLoading ? <DotLoader /> : 'Log in'}
        </button>
      </form>
    </div>
  );
};

export default Login;
