import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import INotification from '../components/hooks/notification/model';
import IResponseError from './IResponseError';

interface IApiServiceConfig extends AxiosRequestConfig {
  retry?: number;
  retryDelay?: number;
};

//TODO: mudar para variáveis de ambiente
export async function ApiServiceRequest<TViewModel = any>({ baseURL = 'http://localhost:3333', method = 'get', timeout = 500, retry = 2, retryDelay = 3000, ...rest }: IApiServiceConfig,
  setLoad: React.Dispatch<React.SetStateAction<boolean>>, setNotification: (message: Omit<INotification, "id">) => void) {
  let counter = 0;
  setLoad(true);

  const api: AxiosInstance = axios.create({ baseURL });

  api.interceptors.request.use(function (config) {
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
      // return new Promise((resolve) => resolve(api.request<TViewModel>({ ...rest, method })));
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


    if (error && axios.isAxiosError(error)) {
      if (error.response?.status !== 500 && error.response?.status !== 404) {
        axiosResponse = {
          ...axiosResponse,
          status: error.response?.status as number,
          data: error.response?.data,
        }
      }

      axiosResponse = {
        ...axiosResponse,
        status: error.response?.status as number,
        statusText: error.response?.statusText as string,
        headers: error.response?.headers as AxiosRequestConfig,
        config: error.response?.config as AxiosRequestConfig,
        request: error.response?.request,
      };

    }
    
    setLoad(false);
    setNotification({ tipo: 'error', descricao: (axiosResponse.data as IResponseError).message });
  }

  return axiosResponse.data;
};

//TODO: remover após alteração para nova api de consulta ao back-end
const api = axios.create({ baseURL: 'http://localhost:3333' });

export default api;

