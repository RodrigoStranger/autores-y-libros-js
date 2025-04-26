const express = require('express');
const router = express.Router();
const { Genero } = require('../models/mongo_generos_model');
const mongoose = require('mongoose');

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

// Ruta para listar todos los géneros
router.get('/', async (req, res) => {
    try {
        const generos = await Genero.find();
        
        if (generos.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No hay géneros registrados',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'Géneros encontrados',
            data: generos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar géneros',
            error: error.message
        });
    }
});

// Ruta para obtener un género específico por ID
router.get('/:id', async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        
        if (!genero) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Género encontrado',
            data: genero
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar el género',
            error: error.message
        });
    }
});

// Ruta para obtener los libros de un género específico
router.get('/:id/libros', async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        
        if (!genero) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }

        // Buscar los libros del género en la colección de Libros
        const libros = await mongoose.connection.collection('Libros')
            .find({ generos: genero.nombre })
            .toArray();

        if (libros.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No hay libros registrados para este género',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'Libros del género encontrados',
            data: libros
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar los libros del género',
            error: error.message
        });
    }
});

// Ruta para actualizar el nombre de un género
router.put('/actualizar/:id/nombre', async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre es requerido'
            });
        }

        const generoActualizado = await Genero.findByIdAndUpdate(
            req.params.id,
            { nombre },
            { new: true, runValidators: true }
        );

        if (!generoActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Nombre del género actualizado exitosamente',
            data: generoActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el nombre del género',
            error: error.message
        });
    }
});

// Ruta para actualizar la descripción de un género
router.put('/actualizar/:id/descripcion', async (req, res) => {
    try {
        const { descripcion } = req.body;

        if (!descripcion) {
            return res.status(400).json({
                success: false,
                message: 'La descripción es requerida'
            });
        }

        const generoActualizado = await Genero.findByIdAndUpdate(
            req.params.id,
            { descripcion },
            { new: true, runValidators: true }
        );

        if (!generoActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Descripción del género actualizada exitosamente',
            data: generoActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la descripción del género',
            error: error.message
        });
    }
});

// Ruta para eliminar un género y actualizar los libros relacionados
router.delete('/:id', async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        
        if (!genero) {
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }

        // Obtener el nombre del género antes de eliminarlo
        const nombreGenero = genero.nombre;

        // Eliminar el género
        await Genero.findByIdAndDelete(req.params.id);

        // Actualizar todos los libros que contienen este género
        await mongoose.connection.collection('Libros').updateMany(
            { generos: nombreGenero },
            { $pull: { generos: nombreGenero } }
        );

        res.status(200).json({
            success: true,
            message: 'Género eliminado exitosamente y actualizados los libros relacionados'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el género',
            error: error.message
        });
    }
});

module.exports = router;