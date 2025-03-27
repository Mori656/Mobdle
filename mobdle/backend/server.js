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

mongoose.connect('mongodb://localhost:27017/Mobdle', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Połączono z MongoDB'))
.catch(err => console.error('Błąd połączenia z MongoDB:', err));

const mobRoutes = require('./routes/mobs');
app.use('/api/mobs', mobRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const leaderboardRoutes = require('./routes/leaderboard');
app.use('/api/leaderboard', leaderboardRoutes);