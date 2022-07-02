import { default as Axios } from 'axios';
import cookie from 'js-cookie';

const getCookie = (name) => {
  return cookie.get(name);
};

// create a new axios instance
const axios = Axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axios.interceptors.request.use(
  (config) => {
    // get the token from the cookie
    const token = getCookie('jwtToken');
    // if token is present
    if (token) {
      // add the token to the headers
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // if token is not present
      // redirect to the login page
      window.location.href = '/login';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers'] =
  'Origin, X-Requested-With, Content-Type, Accept';
axios.defaults.headers.common['Access-Control-Max-Age'] = '1728000';
axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Content-Length';

export default axios;
