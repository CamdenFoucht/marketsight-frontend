import React from 'react';
import { useTheme } from 'emotion-theming';
import { Row, Col } from 'react-flexbox-grid';
import { useForm } from 'react-hook-form';

import Btn from '../../components/Btn/Btn';

import styles from './style.module.css';

const Email = (props: any) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values: any) => {
    props.updateHandler(values.email);
  };

  const theme: any = useTheme();

  let content = (
    <span className={styles.value} style={{ background: theme.accountInput }}>
      {props.email}
    </span>
  );

  if (props.section) {
    content = (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            {errors.email ? (
              <span className={styles.inputErrorMessage}>
                {errors.email && errors.email.message}
              </span>
            ) : null}

            <input
              placeholder={props.placeholder}
              style={{
                color: theme.text,
                background: theme.accountInput,
                border: `1px solid ${theme.accountInputBorder}`,
              }}
              className={errors.email ? styles.inputError : styles.inputValue}
              name='email'
              disabled={props.isLoading}
              onSubmit={props.updateHandler}
              ref={register({
                required: 'Email address cannot be empty',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              defaultValue={props.email}
            />
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
          <span className={styles.label}>Email</span>

          {content}
        </Col>

        {props.activeSection !== 'email' ? (
          <Col xs={2}>
            <button
              className={styles.editBtn}
              onClick={() => props.setActiveSection('email')}
            >
              Edit
            </button>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default Email;
