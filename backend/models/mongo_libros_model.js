const mongoose = require('./backend/models/mongo_connection_pool');

// Esquema del libro
const LibroSchema = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: true,
        unique: true 
    },
    fecha_publicacion: {
        type: Date, 
        required: true,
        validate: {
            validator: function(v) {
                return v <= Date.now();  // No permitir fecha futura
            },
            message: props => `${props.value} no es una fecha válida.`
        }
    },
    sinopsis: { 
        type: String, 
        required: true, 
        unique: true 
    },
    disponibilidad: { 
        type: Boolean, 
        default: true 
    },
    paginas: {
        type: Number, 
        required: true, 
        min: [1, 'El número de páginas debe ser mayor a 0.']
    },
    generos: [{
        type: String, 
        required: true,
        validate: {
            validator: async function(v) {
                // Verificar que el género exista en el esquema "Generos"
                const generoExists = await mongoose.model('Genero').exists({ nombre: { $in: v } });
                return generoExists;
            },
            message: props => `El género(s) ${props.value} no existe en el esquema de géneros.`
        }
    }],
    autores: [{
        type: String,
        required: true,
        validate: {
            validator: async function(v) {
                // Verificar que el autor exista en el esquema "Autores"
                const autorExists = await mongoose.model('Autor').exists({ nombre: { $in: v } });
                return autorExists;
            },
            message: props => `El autor(s) ${props.value} no existe en el esquema de autores.`
        }
    }]
});

// Crear el modelo para Libro
const Libro = mongoose.model("Libro", LibroSchema);

// Exportar el modelo para usarlo en otros archivos
module.exports =  { Libro };