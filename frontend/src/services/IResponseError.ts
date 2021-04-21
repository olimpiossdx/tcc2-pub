import { Status } from '../components/hooks/notification/model';

interface IResponseError {
  status: Status;
  message: string;
}

export default IResponseError;