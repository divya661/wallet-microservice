import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://localhost:3000';
const axiosPublicInstance: AxiosInstance = axios.create({
  baseURL: baseURL
});

export default axiosPublicInstance;
