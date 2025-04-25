// backend/models/mongo_libros_model.js
const mongoose = require('./mongo_connection_pool');

const LibroSchema = new mongoose.Schema({
    titulo: String,
    fecha_publicacion: Date,
    sinopsis: String,
    disponibilidad: Boolean,
    paginas: Number,
    generos: [String], // Puedes usar ObjectId si haces referencias a la colección "Generos"
    autores: [String], // Puedes usar ObjectId si haces referencias a la colección "Autores"
}, {
    collection: 'Libros'  // Especificamos la colección de la BD
});

module.exports = mongoose.model('Libro', LibroSchema);
