import React from 'react';
import { useTheme } from 'emotion-theming';
import { Row, Col } from 'react-flexbox-grid';
import { useForm } from 'react-hook-form';

import Btn from '../../components/Btn/Btn';

import styles from './style.module.css';

const Username = (props: any) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values: any) => {
    props.updateHandler(values.username);
  };

  const theme: any = useTheme();

  let content = (
    <span className={styles.value} style={{ background: theme.accountInput }}>
      {props.username}
    </span>
  );

  console.log(errors);

  if (props.section) {
    content = (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            {errors.username ? (
              <span className={styles.inputErrorMessage}>
                {errors.username &&
                  'Username must be between 3 and 30 characters in length, may contain only letters, numbers, hyphens and underscores.'}
              </span>
            ) : null}

            <input
              placeholder={props.placeholder}
              style={{
                color: theme.text,
                background: theme.accountInput,
                border: `1px solid ${theme.accountInputBorder}`,
              }}
              className={
                errors.username ? styles.inputError : styles.inputValue
              }
              name='username'
              disabled={props.isLoading}
              onSubmit={props.updateHandler}
              ref={register({
                required:
                  'Username must be between 3 and 30 leter and only contain valid characters.',
                minLength: 3,
                maxLength: 30,
              })}
              defaultValue={props.username}
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
          <span className={styles.label}>Username</span>

          {content}
        </Col>

        {props.activeSection !== 'username' ? (
          <Col xs={2}>
            <button
              className={styles.editBtn}
              onClick={() => props.setActiveSection('username')}
            >
              Edit
            </button>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default Username;
