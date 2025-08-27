require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('backend working...');
});

const userRoutes = require('./routes/user.js');
app.use('/api', userRoutes);

const postRoutes = require('./routes/post.js')
app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`));
