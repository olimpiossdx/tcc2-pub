import React from "react";
import { NotificationProvider } from "./notification";

const AppProvider: React.FC = ({ children }) => {
  return (<NotificationProvider>
    {children}
  </NotificationProvider>);
};

export default AppProvider;
