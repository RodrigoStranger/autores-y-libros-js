const express = require('express');
const router = express.Router();
const { Libro } = require('../models/mongo_libros_model');

// Ruta para agregar un nuevo libro
router.post('/crear_libro', async (req, res) => {
    try {
        const {
            titulo,
            fecha_publicacion,
            sinopsis,
            disponibilidad,
            paginas,
            generos,
            autores
        } = req.body;
        // Crear una nueva instancia del libro
        const nuevoLibro = new Libro({
            titulo,
            fecha_publicacion,
            sinopsis,
            disponibilidad,
            paginas,
            generos,
            autores
        });
        // Guardar el libro en la base de datos
        const libroGuardado = await nuevoLibro.save();
        res.status(201).json({
            success: true,
            message: 'Libro agregado exitosamente',
            data: libroGuardado
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al agregar el libro',
            error: error.message
        });
    }
});

module.exports = router;