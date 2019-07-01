/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://127.0.0.1:1337',
  withCredentials: false,
  // async: true,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export default Instance;
