import axios from 'axios';

export const rajaOngkir = axios.create({
  baseURL: process.env.URL_RAJA_ONGKIR,
  timeout: 5000,
  headers: {
    key: process.env.KEY_RAJA_ONGKIR,
  },
});
