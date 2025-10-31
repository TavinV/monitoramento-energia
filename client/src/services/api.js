import axios from 'axios';

const api = axios.create({
    baseURL: 'https://monitoramento-energia.onrender.com/api'
});

export default api;