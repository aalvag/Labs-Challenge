const express = require('express');
const morgan = require('morgan');
const fetch = require('node-fetch');
const cors = require('cors');
const redis = require('redis');
const path = require('path');

const app = express();

const client = redis.createClient(process.env.REDIS_URL);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/api/search', (req, res) => {
  try {
    const word = req.query.q;

    // Check the redis store for the data first
    client.get(word, async (err, items) => {
      if (items) {
        return res.status(200).send({
          error: false,
          message: `products for ${word} from the cache`,
          data: JSON.parse(items),
        });
      } else {
        // When the data is not found in the cache then we can make request to the server

        const response = await fetch(
          `https://api.mercadolibre.com/sites/MLA/search?q=${word}?`
        );
        const json = await response.json();

        const items = [];
        json.results.map((product) => {
          items.push({
            id: product.id,
            title: product.title,
            price: product.price,
            currency: product.currency_id,
            stock: product.available_quantity,
            condition: product.condition,
            image: product.thumbnail,
          });
        });

        // save the record in the cache for subsequent request
        client.setex(word, 1440, JSON.stringify(items));

        // return the result to the client
        return res.status(200).send({
          error: false,
          message: `products for ${word} from the server`,
          data: items,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

const dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
app.listen(
  process.env.PORT || 3001,
  console.log('Server running on port 3001')
);
