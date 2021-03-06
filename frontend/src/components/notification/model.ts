import { Status } from ".";

interface INotification {
  status: Status;
  notificationText: string;
  state: boolean;
};

export default INotification;
