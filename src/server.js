require('dotenv').config();
const server = require('./app');
const mongoose = require('mongoose');

const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const NAME = process.env.DB_NAME;

const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.mevngfo.mongodb.net/${NAME}?retryWrites=true&w=majority`;

//Conexion a MongoDB
mongoose
  .connect(uri)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server on running on port ${PORT} `);
});
