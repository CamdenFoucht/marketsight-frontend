import React, { useState } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Switch from 'react-switch';
import { IoMdMoon } from 'react-icons/io';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

import { useAuth } from '../../Provider/Auth';
import Email from './Email';
import Username from './Username';
import Password from './Password';

import styles from './style.module.css';

const Account = (props: any) => {
  const {
    username,
    email,
    updateAccount,
    isLoading,
    errors,
    clearErrors,
  } = useAuth();

  const handleChange = () => {
    props.setIsDark(!props.isDark);
  };

  const [activeSection, setActiveSection] = useState('');

  const updateHandler = async (value: string, currentPassword?: string) => {
    let success = await updateAccount(activeSection, value, currentPassword);
    if (success) {
      setActiveSectionHandler('');
    }
  };

  const setActiveSectionHandler = (value: string) => {
    setActiveSection(value);
    clearErrors();
  };

  const deleteHandler = () => {
    const result = prompt(
      'Are you sure you want to delete your account? \nPlease type your username if you wish to confirm.'
    );
    if (result === username) {
      updateHandler('delete', '');
    } else {
      alert('Incorrect username. Your account will not be deleted.');
    }
  };

  const theme: any = useTheme();

  return (
    <div className='container'>
      <h1 className={styles.h1}>Account Settings</h1>
      <p className={styles.p} style={{ color: theme.textLight }}>
        Change your profile and account settings
      </p>
      <div
        className={
          styles.account +
          ' ' +
          css`
            background: ${theme.accountBackground};
          `
        }
      >
        <Row>
          <Col md={2} xs={12}>
            <div
              className={styles.userProfileCircle}
              style={{ background: theme.btnBackground, color: theme.btnText }}
            >
              {username.substring(0, 1)}
            </div>
          </Col>
          <Col md={8} mdOffset={1}>
            <div>
              <h3
                className={styles.heading}
                style={{
                  paddingBottom: '2rem',
                  borderBottom: `1px solid ${theme.accountBorderBottom}`,
                }}
              >
                General Info
              </h3>

              <Username
                updateHandler={updateHandler}
                onCancel={() => setActiveSectionHandler('')}
                section={activeSection === 'username'}
                loading={isLoading}
                username={username}
                activeSection={activeSection}
                setActiveSection={setActiveSectionHandler}
              />
              <Email
                updateHandler={updateHandler}
                onCancel={() => setActiveSectionHandler('')}
                section={activeSection === 'email'}
                loading={isLoading}
                email={email}
                activeSection={activeSection}
                setActiveSection={setActiveSectionHandler}
              />

              <Password
                serverError={errors.password}
                updateHandler={updateHandler}
                onCancel={() => setActiveSectionHandler('')}
                section={activeSection === 'password'}
                loading={isLoading}
                activeSection={activeSection}
                setActiveSection={setActiveSectionHandler}
              />

              <div
                className={styles.div}
                style={{ borderColor: theme.accountBorderBottom }}
              >
                <Row>
                  <Col xs={10}>
                    <span className={styles.label}>Night Mode</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '1rem' }}>
                        <IoMdMoon size='4rem' color={theme.text} />
                      </span>
                      <Switch
                        uncheckedIcon={false}
                        checkedIcon={false}
                        checked={props.isDark}
                        onChange={handleChange}
                        height={25}
                        width={50}
                        onColor={'#000'}
                      />
                    </div>
                  </Col>
                </Row>
              </div>

              <div
                className={styles.div}
                style={{ borderColor: theme.accountBorderBottom }}
              >
                <span className={styles.label}>Delete Account</span>
                <button className={styles.deleteBtn} onClick={deleteHandler}>
                  Delete
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Account;
