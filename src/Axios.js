import axios from 'axios';

//! Creates a default Axios call
const APIaxios = axios.create({
  baseURL: process.env.REACT_APP_AXIOS === 'development' ? 'http://localhost:4000/api' : '/api',
  timeout: 50000,
  withCredentials: true,
});

export default APIaxios;
