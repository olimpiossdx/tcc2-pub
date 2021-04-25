import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import INotification from '../components/hooks/notification/model';
import IResponseError from './IResponseError';

interface IApiServiceConfig extends AxiosRequestConfig {
  retry?: number;
  retryDelay?: number;
};

let cancellationToken = axios.CancelToken.source();

export const cancellationRequest = (cancellationReason: string) => {
  cancellationToken.cancel(cancellationReason);
};

export const newCancellationToken = () => {
  cancellationToken = axios.CancelToken.source();
};

const api: AxiosInstance = axios.create({ baseURL: 'http://localhost:3333', cancelToken: cancellationToken.token });

//TODO: mudar para variáveis de ambiente
export async function ApiServiceRequest<TViewModel = any>({ method = 'get', retry = 2, retryDelay = 3000, ...rest }: IApiServiceConfig,
  setLoad?: React.Dispatch<React.SetStateAction<boolean>>, setNotification?: (message: Omit<INotification, "id">) => void) {
  newCancellationToken();
  let counter = 0;

  setLoad && setLoad(true);

  api.interceptors.request.use(function (config) {
    config.cancelToken = cancellationToken.token;

    if (!config.url?.includes('login')) {
      const localStorageToken = localStorage.getItem('@sisag:token') as string;
      const token = JSON.parse(localStorageToken);
      config.headers.authorization = `Bearer ${token}`;
    };

    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (counter < retry) {
      counter += 1;
      return new Promise((resolve) => setTimeout(() => resolve(api.request<TViewModel>({ ...rest, method })), retryDelay));
    };

    return Promise.reject(error);
  });

  let axiosResponse: AxiosResponse<TViewModel | IResponseError>;

  try {
    axiosResponse = await api.request<TViewModel>({ ...rest, method }) as AxiosResponse<TViewModel>;
  } catch (error) {

    axiosResponse = {
      data: { status: 'error', message: 'Ocorreu um erro, caso persista, contacte o suporte' },
      status: 500,
      statusText: 'Internal Server Error',
      headers: rest.headers,
      config: rest,
      request: rest,
    } as AxiosResponse<IResponseError>;

    //TODO: melhorar lógica de tratamento de erro
    if (error && axios.isAxiosError(error)) {
      if (error.response && error.response.status !== 500 && error.response.status !== 404) {
        axiosResponse = {
          ...axiosResponse,
          status: error.response.status,
          data: error.response.data,
          statusText: error.response.statusText,
          headers: error.response.headers,
          config: error.response.config,
          request: error.response.request,
        }
      }
      
      //TODO:alterar para um api de contexto
      if (!axios.isCancel(error) && error.response?.status === 401) {
        setNotification && setNotification({ tipo: 'error', descricao: (axiosResponse.data as IResponseError).message });
        setTimeout(() => {
          localStorage.removeItem('@sisag:token');
          localStorage.removeItem('@sisag:user');
          window.location.replace('/');
        }, 2100);
      } else {
        setNotification && setNotification({ tipo: 'error', descricao: (axiosResponse.data as IResponseError).message });
      }
    };
  };

  setLoad && setLoad(false);
  return axiosResponse.data;
};

//TODO: remover api antiga e padronizar as requisições
export default api;

