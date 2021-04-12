import axios from "axios";

//TODO: mudar para variáveis de ambiente
const api = axios.create({ baseURL: 'http://localhost:3333' });

export default api;
