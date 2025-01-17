import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
});

//com esse arquivo do axios, as chamadas para as apis ficam mais simples como no exemplo abaixo
// await axios.post('https://localhost:300/api/resume/download')
// await api.post('/resume/download')
