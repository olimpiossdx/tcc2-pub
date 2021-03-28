import React from 'react';
import { AuthenticationProvider } from './authentication';
import { NotificationProvider } from './notification';

const AppProvider: React.FC = ({ children }) => {
  return (<AuthenticationProvider>
    <NotificationProvider>{children}</NotificationProvider>
  </AuthenticationProvider>);
};

export default AppProvider;
