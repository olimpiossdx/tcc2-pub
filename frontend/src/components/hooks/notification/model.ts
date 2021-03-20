interface INotification {
  tipo: 'success' | 'info' | 'warning' | 'error';
  descricao: string;
};

export default INotification;
