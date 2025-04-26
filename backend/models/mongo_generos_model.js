const { mongoose } = require('./mongo_connection_pool');
const { Schema } = mongoose;

// Esquema de Genero
const GeneroSchema = new Schema({
    nombre: { 
        type: String,
        required: true,
        validate: {
            validator: async function(v) {
                try {
                    const generoExistente = await mongoose.connection.collection('Generos').findOne({ nombre: v });
                    if (generoExistente) {
                        throw new Error('Ya existe un género con este nombre');
                    }
                    return true;
                } catch (error) {
                    throw new Error(`Error al validar nombre: ${error.message}`);
                }
            }
        }
    },
    descripcion: { 
        type: String,
        required: true,
        validate: {
            validator: async function(v) {
                try {
                    const generoExistente = await mongoose.connection.collection('Generos').findOne({ descripcion: v });
                    if (generoExistente) {
                        throw new Error('Ya existe un género con esta descripción');
                    }
                    return true;
                } catch (error) {
                    throw new Error(`Error al validar descripción: ${error.message}`);
                }
            }
        }
    }
});

// Crear el modelo para Genero
const Genero = mongoose.model("Genero", GeneroSchema, "Generos");

// Exportar el modelo para usarlo en otros archivos
module.exports = { Genero };