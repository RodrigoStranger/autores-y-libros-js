const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// npm install express mongoose dotenv cors
require('dotenv').config();

// Configuración de express
const app = express();
app.use(express.json());

// Importa la conexión a la base de datos
require('../backend/models/mongo_connection_pool');

// Define el esquema del modelo Usuario para la colección Usuarios
const Usuario = mongoose.model('Usuario', new mongoose.Schema({
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    telefono: String,
    direccion: String,
    clave: String,
    fecha_nacimiento: Date,
}), 'Usuarios');

// Ruta de Login
app.post('/login', async (req, res) => {
    const { nombre, clave } = req.body; // Pedir el nombre y la clave
    try {
        // Busca el usuario por nombre en la colección Usuarios
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