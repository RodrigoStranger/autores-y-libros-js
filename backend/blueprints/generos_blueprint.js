const express = require('express');
const router = express.Router();
const { Genero } = require('../models/mongo_generos_model');

// Ruta para crear un nuevo género
router.post('/crear_genero', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        // Crear una nueva instancia del género
        const nuevoGenero = new Genero({
            nombre,
            descripcion
        });

        // Guardar el género en la base de datos
        const generoGuardado = await nuevoGenero.save();

        res.status(201).json({
            success: true,
            message: 'Género creado exitosamente',
            data: generoGuardado
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el género',
            error: error.message
        });
    }
});

module.exports = router;
