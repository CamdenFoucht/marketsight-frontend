import React from 'react';
import { useTheme } from 'emotion-theming';
import { Row, Col } from 'react-flexbox-grid';
import { useForm } from 'react-hook-form';

import Btn from '../../components/Btn/Btn';

import styles from './style.module.css';

const Password = (props: any) => {
  const { handleSubmit, register, errors, watch } = useForm();

  const onSubmit = (values: any) => {
    props.updateHandler(values.newPassword, values.currentPassword);
  };

  const theme: any = useTheme();

  let content = (
    <span className={styles.pwValue} style={{ background: theme.accountInput }}>
      ***************
    </span>
  );

  console.log(errors);

  if (props.section) {
    content = (
      <>
        {props.serverError ? (
          <span className={styles.errorMessage}>
            <img
              alt='error'
              src={require('../../assets/img/error.png')}
              className={styles.errorImg}
            />
            {props.serverError}
          </span>
        ) : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <input
              placeholder='Current Password'
              style={{
                color: theme.text,
                background: theme.accountInput,
                border: `1px solid ${theme.accountInputBorder}`,
              }}
              className={
                errors.currentPassword ? styles.pwInputError : styles.pwInput
              }
              type='password'
              name='currentPassword'
              disabled={props.isLoading}
              onSubmit={props.updateHandler}
              ref={register()}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              placeholder='New Password'
              style={{
                color: theme.text,
                background: theme.accountInput,
                border: `1px solid ${theme.accountInputBorder}`,
              }}
              className={
                errors.newPassword ? styles.pwInputError : styles.pwInput
              }
              name='newPassword'
              disabled={props.isLoading}
              onSubmit={props.updateHandler}
              ref={register({
                required: true,
                minLength: 5,
                maxLength: 30,
              })}
              type='password'
            />
          </div>
          <div className={styles.formGroup}>
            <input
              placeholder='Confirm Password'
              style={{
                color: theme.text,
                background: theme.accountInput,
                border: `1px solid ${theme.accountInputBorder}`,
              }}
              className={
                errors.confirmPassword ? styles.pwInputError : styles.pwInput
              }
              name='confirmPassword'
              disabled={props.isLoading}
              onSubmit={props.updateHandler}
              ref={register({
                required: true,
                minLength: 5,
                maxLength: 30,
                validate: (value) => value === watch('newPassword'),
              })}
              type='password'
            />
            {errors.confirmPassword ? (
              <span className={styles.inputErrorMessage}>
                {errors.confirmPassword &&
                  'Passwords must match and be at least 5 characters.'}
              </span>
            ) : null}
          </div>

          <Btn type='submit' disabled={props.loading}>
            Save
          </Btn>
          <Btn outline onClick={props.onCancel} disabled={props.loading}>
            Cancel
          </Btn>
        </form>
      </>
    );
  }

  return (
    <div
      className={styles.div}
      style={{ borderColor: theme.accountBorderBottom }}
    >
      <Row>
        <Col xs={10}>
          <span className={styles.label}>Password</span>

          {content}
        </Col>

        {props.activeSection !== 'password' ? (
          <Col xs={2}>
            <button
              className={styles.editBtn}
              onClick={() => props.setActiveSection('password')}
            >
              Edit
            </button>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default Password;
