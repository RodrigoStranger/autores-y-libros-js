const express = require('express');
const router = express.Router();
const { Autor } = require('../models/mongo_autores_model');

// Ruta para crear un nuevo autor
router.post('/crear_autor', async (req, res) => {
    try {
        const { nombre, fecha_nacimiento, nacionalidad } = req.body;

        // Crear una nueva instancia del autor
        const nuevoAutor = new Autor({
            nombre,
            fecha_nacimiento,
            nacionalidad
        });

        // Guardar el autor en la base de datos
        const autorGuardado = await nuevoAutor.save();

        res.status(201).json({
            success: true,
            message: 'Autor creado exitosamente',
            data: autorGuardado
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el autor',
            error: error.message
        });
    }
});

module.exports = router;
