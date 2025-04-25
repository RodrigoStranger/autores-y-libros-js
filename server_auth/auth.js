const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

// Configuración de express
const app = express();
app.use(express.json());

// Importa la conexión a la base de datos
require('../backend/models/mongo_connection_pool');

// Define el esquema del modelo Usuario para la colección 'Usuarios'
const Usuario = mongoose.model('Usuario', new mongoose.Schema({
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    telefono: String,
    direccion: String,
    clave: String, // Clave en texto plano
    fecha_nacimiento: Date,
}), 'Usuarios'); // Especifica la colección 'Usuarios'

// Ruta para el registro (opcional, para crear usuarios)
app.post('/register', async (req, res) => {
    try {
        const user = new Usuario(req.body);
        await user.save();
        res.status(201).send("Usuario registrado");
    } catch (error) {
        res.status(500).send("Error al registrar el usuario");
    }
});

// Ruta de Login
app.post('/login', async (req, res) => {
    const { nombre, clave } = req.body; // Pide el nombre y la clave
    
    try {
        // Busca el usuario por nombre en la colección 'Usuarios'
        const user = await Usuario.findOne({ nombre: nombre });

        if (!user) {
            return res.status(401).send("Credenciales inválidas: Usuario no encontrado");
        }

        // Verifica si la clave coincide
        if (user.clave !== clave) {
            return res.status(401).send("Credenciales inválidas: Contraseña incorrecta");
        }

        // Si las credenciales son correctas, crea un token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Devuelve el token al usuario
        res.json({ token });

    } catch (error) {
        res.status(500).send("Error al verificar las credenciales");
    }
});

// Inicia el servidor
app.listen(4000, () => console.log("Auth server en puerto 4000"));
