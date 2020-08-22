import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

interface AuthType {
  token: string;
  username: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  authenticate: (data: any) => void;
  logout: () => void;
  email: string;
  updateAccount: (
    section: string,
    value: string,
    currentPassword?: string
  ) => Promise<Boolean>;
  errors: any;
  clearErrors: () => void;
}

const API_URL = 'https://marketsight.herokuapp.com/';

const Context = createContext<AuthType | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Check local storage for token when app loads
  useEffect(() => {
    const uToken = localStorage.getItem('token');
    const uName = localStorage.getItem('username');
    const uEmail = localStorage.getItem('email');
    if (!uToken || !uName || !uEmail) {
      return;
    }
    setToken(uToken);
    setUsername(uName);
    setEmail(uEmail);
    setAuthenticated(true);
  }, []);

  // Update or put token in local storage when it changes
  useEffect(() => {
    if (token && username) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      setAuthenticated(token !== null);
      // history.push('/watchlist');
    }
  }, [token, username, email]);

  // Deafult mode is login, adds email field and changes url if mode is signup
  const authenticate = async (data: any) => {
    setLoading(true);

    const { username, password, email, mode = 'signin' } = data;
    let req = { username, password, email };
    let url = `${API_URL}api/auth/${mode}`;

    try {
      const res = await axios.post(url, req);
      let { token, user } = res.data;
      setToken(token);
      setUsername(user.username);
      setEmail(user.email);
      setAuthenticated(token !== null);
      setErrors({});
    } catch (err) {
      console.log(err); // Manage error eventually
      setErrors({ auth: 'Incorrect username or password. Please try again.' });
    }

    setLoading(false);
  };

  const updateAccount = async (
    section: string,
    value: string,
    currentPassword?: string
  ) => {
    try {
      setLoading(true);

      let url = `${API_URL}api/account/`;

      if (section === 'delete') {
        url += 'delete';
      } else {
        url += `change/${section}`;
      }

      let res = await axios.post(
        url,
        { value, section, currentPassword },
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
        }
      );

      let data = res.data;

      if (data.section === 'username' && data.success) {
        setUsername(data.username);
      } else if (data.section === 'email' && data.success) {
        setEmail(data.email);
      } else if (data.section === 'delete' && data.success) {
        logout();
      }

      setLoading(false);

      return true;
    } catch (error) {
      console.log(error);
      if (section === 'password') {
        setErrors((prevErrors) => {
          return {
            password: 'Incorrect password.',
          };
        });
      }
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // history.push('login');
  };

  const clearErrors = () => {
    setErrors({});
  };

  return (
    <Context.Provider
      value={{
        token,
        username,
        isAuthenticated,
        isLoading,
        authenticate,
        logout,
        email,
        updateAccount,
        errors,
        clearErrors,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useAuth = (): AuthType => {
  const AuthContext = useContext(Context);

  if (!AuthContext) {
    throw new Error('Must be used in Auth Provider');
  }

  return AuthContext;
};

export { AuthProvider, useAuth };
