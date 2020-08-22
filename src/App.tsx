import React from 'react';
import { useTheme } from 'emotion-theming';

import ProtectedProviders from './Provider/ProtectProviders';
import { useAuth } from './Provider/Auth';
import Routes from './Routes';
import Navbar from './components/Navigation/Navbar';
import ModalRoot from './components/Modals/ModalRoot';

import './App.css';

function App(props: any) {
  const { token } = useAuth();

  const theme: any = useTheme();

  let app = <Routes />;

  if (token) {
    app = (
      <ProtectedProviders>
        <div
          className='App'
          style={{ backgroundColor: theme.background, color: theme.text }}
        >
          <ModalRoot />
          <Navbar setIsDark={props.setIsDark} isDark={props.isDark} />
          <Routes />
        </div>
      </ProtectedProviders>
    );
  }

  return app;
}

export default App;
