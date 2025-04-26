const { mongoose } = require('./mongo_connection_pool');
const { Schema } = mongoose;

// Esquema de Autor
const AutorSchema = new Schema({
    nombre: { 
        type: String, 
        required: true,
        validate: {
            validator: async function(v) {
                try {
                    const autorExistente = await mongoose.connection.collection('Autores').findOne({ nombre: v });
                    if (autorExistente) {
                        throw new Error('Ya existe un autor con este nombre');
                    }
                    return true;
                } catch (error) {
                    throw new Error(`Error al validar nombre: ${error.message}`);
                }
            }
        }
    },
    fecha_nacimiento: { 
        type: Date, 
        required: true,
        validate: {
            validator: function(v) {
                return v <= Date.now();  // Verificar que la fecha de nacimiento no sea futura
            },
            message: props => `${props.value} no es una fecha válida.`
        }
    },
    nacionalidad: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(v) {
                // Verificar que solo haya una nacionalidad
                return typeof v === 'string' && v.trim().split(',').length === 1;
            },
            message: 'Debe contener solo una nacionalidad.'
        }
    }
});

// Crear el modelo para Autor
const Autor = mongoose.model("Autor", AutorSchema);

// Exportar el modelo para usarlo en otros archivos
module.exports = { Autor };