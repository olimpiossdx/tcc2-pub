import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.css';
import DefaulTheme from './components/theme';
import Routes from './routes';

const App: React.FC = () => (
  <ThemeProvider theme={DefaulTheme}>
    <Routes />
  </ThemeProvider>
);

export default App;
