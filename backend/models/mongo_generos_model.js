const { mongoose } = require('./mongo_connection_pool');
const { Schema } = mongoose;

// Esquema de Género
const GeneroSchema = new Schema({
    nombre: { 
        type: String,
        required: true,
        unique: true,
    },
    descripcion: { 
        type: String,
        required: true,
        unique: true,
    }
});

// Crear el modelo para Genero
const Genero = mongoose.model("Genero", GeneroSchema);

// Exportar el modelo para usarlo en otros archivos
module.exports = { Genero };