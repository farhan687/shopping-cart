import axios from 'axios';

if (process.env.REACT_APP_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
}
const productsUrl = '/api/v1/products';

export default {
  fetchProducts(offset = 0, length = 10) {
    return new Promise((resolve, reject) => {
      axios.get(`${productsUrl}?offset=${offset}&length=${length}`).then(({ data }) => {
        resolve(data);
      }).catch(reject);
    });
  },
};
