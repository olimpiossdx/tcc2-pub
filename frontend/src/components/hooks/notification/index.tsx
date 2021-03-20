import React, { createContext, useContext, useCallback, useState } from 'react';
import { Alert, Snackbar, Typography } from '@material-ui/core';
import INotification from './model';

interface INoficationContext {
  addNotification(message: Omit<INotification, 'id'>): void;
  removeNotification(id: string): void;
}

const NotificationContext = createContext<INoficationContext>({} as INoficationContext);

const useNotifcation = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }

  return context;
}

const NotificationProvider: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState<INotification>({} as INotification)

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const addNotification = useCallback(({ tipo, descricao }: INotification) => {
    const message = { tipo, descricao };
    setMessage(message);
    setOpen(true);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setMessage(state => ({}) as INotification);
  }, []);

  return (<NotificationContext.Provider value={{ addNotification, removeNotification }}>
    {children}
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose} style={{ top: 68, right: 5 }} >
      <Alert onClose={handleClose} severity={message.tipo}>
        <Typography variant='subtitle2'>
          {message.descricao}
        </Typography>
      </Alert>
    </Snackbar>

  </NotificationContext.Provider>)
}


export { NotificationProvider, useNotifcation };