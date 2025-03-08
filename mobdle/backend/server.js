const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serwer działa!');
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie: ${port}`);
});