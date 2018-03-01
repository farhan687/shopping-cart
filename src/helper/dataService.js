import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8011';

export default {
  fetchProducts(offset = 0, length = 10) {
    return new Promise((resolve, reject) => {
      axios.get(`/products?offset=${offset}&length=${length}`).then(({ data }) => {
        resolve(data);
      }).catch(reject);
    });
  },
};
