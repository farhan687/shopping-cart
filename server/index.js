const express = require('express');
const cors = require('cors');
const products = require('./data/products');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.static('build'));

/* GET: products
  Query Params: offset, length
  offset: starting id point
  length: number of products in response
*/
app.get('/api/v1/products', (req, res) => {
  let { offset = 0, length = 10 } = req.query;
  offset = parseInt(offset, 10);
  length = parseInt(length, 10);
  res.send({
    data: products.slice(offset, offset + length),
    total: products.length,
  });
});

app.listen(PORT, () => console.log(`Cart test App listening on port ${PORT}!`));

