const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_All_PRODUCTS_QUERY =  'SELECT * FROM reacttest.products';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root1994',
  database: 'reacttest'
});

connection.connect(err => {
  if(err) {
    return err;
  }
});

console.log(connection)

app.use(cors());

app.get('/', (req, res) => {
  res.send('go to /products to see products')
});

app.get('/heelo', (req, res) => {
  res.send('nice');
})

app.get('/products', (req, res) => {
  connection.query(SELECT_All_PRODUCTS_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.json({
        data: results
      })
    }
  });
});

app.listen(4000, () => {
  console.log(`Product server listening to port 4000`)
});