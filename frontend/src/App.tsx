import React from 'react';
import Routes from './routes';

import './globalStyles.css';
import { ThemeProvider } from '@material-ui/core';
import DefaulTheme from './components/theme';
import AppProvider from './components/hooks';

const App: React.FC = () =>
(<ThemeProvider theme={DefaulTheme}>
  <AppProvider>
    <Routes />
  </AppProvider>
</ThemeProvider>);

export default App;
