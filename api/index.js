const express = require('express');
const cors = require('cors')
const config = require('./db/db.config');

const app = express();
app.use(cors())
app.use(express.json());

const router = require('./routes/data.router')
app.use('/',router);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });