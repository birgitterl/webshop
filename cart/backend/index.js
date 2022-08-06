const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const port = process.env.PORT || 8081;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/cart', require('./src/routes/api/cart'));

app.get('/', (req, res) => {
  res.send('cart_mfe: server up and running...');
});

connectDB();

app.listen(port, () => {
  console.log(`cart_mfe: Server startet on port ${port}`);
});
