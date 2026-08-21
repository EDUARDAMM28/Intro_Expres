const express = require('express');
const app = express();
require('dotenv/config')
const port = process.env.port || 3000;


app.get("/", (_, res) => {
  res.send('API - REST APRENDICES');
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto: ${port}`);
});