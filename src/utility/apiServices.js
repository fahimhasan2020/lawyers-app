import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseApi } from '../constants/url';
const ApiService = axios.create({
  baseURL: baseApi,
});

ApiService.interceptors.request.use(
  async config => {
    if (config.file) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      if (!config.headers) {
        config.headers['Content-Type'] = 'application/json';
        config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        config.headers['Pragma'] = 'no-cache';
        config.headers['Expires'] = 0;
      }
    }
    if (!config?.noAuth) {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
ApiService.interceptors.response.use(
  response => {
    return response?.data || {};
  },
  error => {
    return Promise.reject(JSON.stringify(error.response));
  },
);

export default ApiService;
