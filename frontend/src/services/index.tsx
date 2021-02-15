import axios from "axios";

//TODO: mudar para variáveis de ambiente
const api = axios.create({ baseURL: 'http://localhost:4000' });

export default api;
