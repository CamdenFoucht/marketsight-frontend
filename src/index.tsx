import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './Provider/Auth';
import Root from './Root';

import './index.css';

console.log(
  '%c HIRE ME!\n Camden Foucht\n fouchtc@uw.edu\n 425-281-9061',
  'font-weight: bold; font-size: 50px; color: #0d47a1;)'
);

ReactDOM.render(
  <React.StrictMode>
    <Router basename='/marketsight'>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
