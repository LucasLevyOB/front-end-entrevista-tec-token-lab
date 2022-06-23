import axios from 'axios';

// faz a configuração da api
const httpClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    // anything you want to add to the headers
  },
});

export default httpClient;
