import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core';
import DefaulTheme from './components/theme';
import Routes from './routes';

const App: React.FC = () =>
(<ThemeProvider theme={DefaulTheme}>
  <Routes />
</ThemeProvider>);

export default App;
