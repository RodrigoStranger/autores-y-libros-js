const express = require('express');
const router = express.Router();
const { Autor } = require('../models/mongo_autores_model');
const mongoose = require('mongoose');
const { verificarToken } = require('../../server_auth/authentication');

// Ruta para crear un nuevo autor
router.post('/crear_autor', verificarToken, async (req, res) => {
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

// Ruta para listar todos los autores
router.get('/', verificarToken, async (req, res) => {
    try {
        const autores = await Autor.find();
        
        if (autores.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No hay autores registrados',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'Autores encontrados',
            data: autores
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar autores',
            error: error.message
        });
    }
});

// Ruta para obtener un autor específico por ID
router.get('/:id', verificarToken, async (req, res) => {
    try {
        const autor = await Autor.findById(req.params.id);
        
        if (!autor) {
            return res.status(404).json({
                success: false,
                message: 'Autor no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Autor encontrado',
            data: autor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar el autor',
            error: error.message
        });
    }
});

// Ruta para obtener los libros de un autor específico
router.get('/:id/libros', verificarToken, async (req, res) => {
    try {
        const autor = await Autor.findById(req.params.id);
        
        if (!autor) {
            return res.status(404).json({
                success: false,
                message: 'Autor no encontrado'
            });
        }

        // Buscar los libros del autor en la colección de Libros
        const libros = await mongoose.connection.collection('Libros')
            .find({ autores: autor.nombre })
            .toArray();

        if (libros.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No hay libros registrados para este autor',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'Libros del autor encontrados',
            data: libros
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar los libros del autor',
            error: error.message
        });
    }
});

// Ruta para actualizar el nombre y la descripción de un autor
router.put('/actualizar/:id', verificarToken, async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        // Actualizar el autor en la base de datos
        const autorActualizado = await Autor.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion },
            { new: true, runValidators: true }
        );

        // Verificar si el autor fue encontrado
        if (!autorActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Autor no encontrado'
            });
        }

        // Actualizar todos los libros que contienen el nombre del autor
        await mongoose.connection.collection('Libros').updateMany(
            { autores: autorActualizado.nombre },
            { $set: { 'autores.$': autorActualizado.nombre } }
        );

        // Responder con el autor actualizado
        res.status(200).json({
            success: true,
            message: 'Nombre y descripción del autor actualizados exitosamente y libros relacionados actualizados',
            data: autorActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el autor o los libros relacionados',
            error: error.message
        });
    }
});

// Ruta para eliminar un autor y actualizar los libros relacionados
router.delete('/:id', verificarToken, async (req, res) => {
    try {
        const autor = await Autor.findById(req.params.id);
        
        if (!autor) {
            return res.status(404).json({
                success: false,
                message: 'Autor no encontrado'
            });
        }

        // Obtener el nombre del autor antes de eliminarlo
        const nombreAutor = autor.nombre;

        // Eliminar el autor
        await Autor.findByIdAndDelete(req.params.id);

        // Actualizar todos los libros que contienen este autor
        await mongoose.connection.collection('Libros').updateMany(
            { autores: nombreAutor },
            { $pull: { autores: nombreAutor } }
        );

        res.status(200).json({
            success: true,
            message: 'Autor eliminado exitosamente y actualizados los libros relacionados'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el autor',
            error: error.message
        });
    }
});

module.exports = router;