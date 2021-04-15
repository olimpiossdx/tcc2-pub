export type Status = 'success' | 'info' | 'warning' | 'error';

interface INotification {
  tipo: Status;
  descricao: string;
};

export default INotification;
