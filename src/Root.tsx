import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import App from './App';

const logoLight = require('./assets/img/logo-light.png');
const logoDark = require('./assets/img/logo-dark.png');

const themeLight = {
  primaryColor: '#000',
  primaryText: '#fff',
  text: '#000',
  textLight: '#666',
  background: '#fff',
  buttonText: '#000',
  buttonTextHover: '#fff',
  buttonBorder: '#000',
  buttonBg: 'rgba(0,0,0,0)',
  buttonBgHover: 'rgba(0,0,0,1)',
  watchlistNavActive: '#000',
  watchlistNav: '#9e9e9e',
  newsBackgroundHover: '#eee',
  ratingBar: 'rgb(45 45 45 / 15%)',
  ratingFilled: '#828282',
  ratingPercentBackground: '#fff',
  ratingGradient: 'linear-gradient(to right, #fff, transparent)',
  navbarDropdownShadow: '#eee',
  navbarDropdownBackground: '#fff',
  modalBackground: '#fff',
  modalSearchContainer: '#eee',
  chartBackground: '#eee',
  newsBorder: '#eee',
  skeletonBackground: '#bbb',
  skeletonForeground: '#ccc',
  category: '#eee',
  dropdownBackground: '#fff',
  dropdownItemHover: '#ccc',
  dropdownMoreHover: '#ccc',
  dropdownBorderBottom: '#eee',
  modalItemBackground: '#eee',
  modalItemHover: '#ccc',
  selectedStockBackground: '#ccc',
  modalInputBackground: '#eee',
  peerBackground: '#ccc',
  verticalBackground: '#eee',
  chartBackgroundHover: '#ccc',
  verticalBorder: '1px solid #ccc',
  verticalBoxShadow:
    '0px 12px 24px rgba(0,0,0,0.06), 0px -12px 24px rgba(0,0,0,0.06)',
  logo: logoDark,
  rowChartBorderBottom: '1px solid #ccc',
  rowChartBackground: '#fff',
  btnBackground: '#000',
  btnText: '#fff',
  dropdownShadow: '-2px 1px 15px -3px rgba(204,204,204,1)',
  accountInput: '#fff',
  accountInputBorder: '#ccc',
  accountBorderBottom: '#ddd4d4',
  accountBackground: '#eee',
  borderBottom: '#eee',
  searchIcon: '#000',
};

const themeDark = {
  primaryColor: '#fff',
  primaryText: '#000',
  text: '#fff',
  textLight: '#666',
  background: '#121212',
  buttonText: '#fff',
  buttonTextHover: '#000',
  buttonBorder: '#fff',
  buttonBg: 'rgba(255, 255, 255, 0)',
  buttonBgHover: 'rgba(255, 255, 255, 1)',
  watchlistNavActive: '#fff',
  watchlistNav: '#555',
  newsBackgroundHover: '#222',
  ratingBar: 'rgba(255, 255, 255, 0.1)',
  ratingFilled: '#fff',
  ratingPercentBackground: '#101010',
  ratingGradient: 'linear-gradient(to right, #101010, transparent)',
  navbarDropdownBackground: '#0e0e0e',
  navbarDropdownShadow: '#000',
  modalBackground: '#101010',
  modalSearchContainer: '#191919',
  chartBackground: '#1f1f1f',
  newsBorder: '#333',
  skeletonBackground: '#222',
  skeletonForeground: '#2a2a2a',
  category: '#222',
  dropdownBackground: '#0e0e0e',
  dropdownItemHover: '#222',
  dropdownMoreHover: '#222',
  dropdownBorderBottom: '#333',
  modalItemBackground: '#232323',
  modalItemHover: '#161616',
  selectedStockBackground: '#191919',
  modalInputBackground: '#191919',
  peerBackground: '#191919',
  verticalBackground: '#1f1f1f',
  chartBackgroundHover: '#333',
  verticalBorder: '1px solid #000',
  verticalBoxShadow:
    '0px 12px 24px rgba(0,0,0,0.08), 0px -12px 24px rgba(0,0,0,0.08)',
  logo: logoLight,
  rowChartBorderBottom: '1px solid #222',
  rowChartBackground: '#101010',
  btnBackground: '#fff',
  btnText: '#000',
  dropdownShadow: '-2px 1px 15px -3px #111',
  accountInput: '#121212',
  accountInputBorder: '#222',
  accountBorderBottom: '#282828',
  accountBackground: '#171717',
  borderBottom: '#333',
  searchIcon: '#aaa',
};

function Root() {
  const [isDark, setIsDark] = useState(true);

  return (
    <ThemeProvider theme={isDark ? themeDark : themeLight}>
      <App isDark={isDark} setIsDark={setIsDark} />
    </ThemeProvider>
  );
}

export default Root;
