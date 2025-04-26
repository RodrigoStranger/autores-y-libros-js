// app.js
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Conexión MongoDB
require('./backend/models/mongo_connection_pool');

// Rutas
app.use('/autores', require('./backend/blueprints/autores_blueprint'));
app.use('/generos', require('./backend/blueprints/generos_blueprint'));
app.use('/libros', require('./backend/blueprints/libros_blueprint'));

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));