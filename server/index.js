const express = require('express');
const cors = require('cors');
const products = require('./data/products');

const app = express();
app.use(cors());

/* GET: products
  Query Params: offset, length
  offset: starting id point
  length: number of products in response
*/
app.get('/products', (req, res) => {
  let { offset = 0, length = 10 } = req.query;
  offset = parseInt(offset, 10);
  length = parseInt(length, 10);
  res.send({
    data: products.slice(offset, offset + length),
    total: products.length,
  });
});

app.listen(8011, () => console.log('Cart test App listening on port 8011!'));

