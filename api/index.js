const express = require('express');
const cors = require('cors')
const config = require('./db/db.config');
const db = knex(config);

const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, world!");
  });

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });