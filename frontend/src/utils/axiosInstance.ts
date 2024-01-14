import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.NODE_ENV=='production' ? 'http://34.100.143.158:3000' : 'http://localhost:3000';
const axiosPublicInstance: AxiosInstance = axios.create({
  baseURL: baseURL
});

export default axiosPublicInstance;
