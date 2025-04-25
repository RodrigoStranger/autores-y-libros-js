// backend/models/mongo_autores_model.js
const mongoose = require('./mongo_connection_pool');

const AutorSchema = new mongoose.Schema({
    nombre: String,
    fecha_nacimiento: Date,
    nacionalidad: String,
});

// Especificamos explícitamente que la colección es "Autores" (con mayúscula)
module.exports = mongoose.model('Autor', AutorSchema, 'Autores');
