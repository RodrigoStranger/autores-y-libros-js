const express = require('express');
const cors = require('cors');

// Importar los modelos
require('./backend/models/mongo_generos_model');
require('./backend/models/mongo_autores_model');

const librosBlueprint = require('./backend/blueprints/libros_blueprint');
const generosBlueprint = require('./backend/blueprints/generos_blueprint');
const autoresBlueprint = require('./backend/blueprints/autores_blueprint');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/casa/libros', librosBlueprint);
app.use('/casa/generos', generosBlueprint);
app.use('/casa/autores', autoresBlueprint);

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});