export type Status = 'success' | 'info' | 'warning' | 'error';

interface INotification {
  status: Status;
  notificationText: string;
  state: boolean;
};

export default INotification;
