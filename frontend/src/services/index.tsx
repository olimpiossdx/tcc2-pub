import axios from "axios";

//TODO: adicionando teste para apiServiceRequest
//const response = await ApiServiceRequest<IReseponse>({ method: 'post', url: 'download/asdasd', data: { item: 1 } });
//console.log('response', response);

// export async function ApiServiceRequest<TViewModel>({ baseURL = 'http://localhost:3333', method = 'get', ...rest }: AxiosRequestConfig): Promise<TViewModel> {

//   const api: AxiosInstance = axios.create({ baseURL });

//   api.interceptors.request.use(function (config) {

//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

//   // Add a response interceptor
//   api.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     console.log('respose -> error', error);
//     return Promise.reject(error);
//   });

//   const response = await api.request<TViewModel>({ ...rest, method }) as AxiosResponse<TViewModel>;
//   return response.data;
// };

//TODO: mudar para variáveis de ambiente
const api = axios.create({ baseURL: 'http://localhost:3333' });

export default api;
