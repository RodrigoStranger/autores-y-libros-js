// backend/models/mongo_generos_model.js
const mongoose = require('./mongo_connection_pool');

const GeneroSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
}, {
    collection: 'Generos' 
});

module.exports = mongoose.model('Genero', GeneroSchema);
