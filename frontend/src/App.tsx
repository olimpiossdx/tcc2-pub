import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'dotenv/config';

import Routes from './routes';

import './globalStyles.css';
import { ThemeProvider } from '@material-ui/core';
import DefaulTheme from './components/theme';
import AppProvider from './components/hooks';

const App: React.FC = () =>
(<ThemeProvider theme={DefaulTheme}>
  <AppProvider>
    <Router>
      <Routes />
    </Router>
  </AppProvider>
</ThemeProvider>);

export default App;
