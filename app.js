const express = require('express');
const cors = require('cors');
const librosBlueprint = require('./backend/blueprints/libros_blueprint');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/libros', librosBlueprint);

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});