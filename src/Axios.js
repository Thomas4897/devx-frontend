import axios from 'axios';

//! Creates a default Axios call
const APIaxios = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export default APIaxios;
