const express = require('express');
const router = express.Router();
const { mongoose } = require('../models/mongo_connection_pool');
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

        // Crear una nueva instancia del libro usando el modelo
        const nuevoLibro = new Libro({
            titulo,
            fecha_publicacion: new Date(fecha_publicacion),
            sinopsis,
            disponibilidad: disponibilidad || true,
            paginas,
            generos,
            autores
        });

        // Guardar el libro usando el método save() del modelo
        const libroGuardado = await nuevoLibro.save();

        res.status(201).json({
            success: true,
            message: 'Libro agregado exitosamente',
            data: libroGuardado
        });
    } catch (error) {
        console.error('Error al crear libro:', error);
        res.status(400).json({
            success: false,
            message: 'Error al agregar el libro',
            error: error.message
        });
    }
});

// Ruta para listar libros disponibles
router.get('/', async (req, res) => {
    try {
        const librosDisponibles = await Libro.find({ disponibilidad: true });
        
        if (librosDisponibles.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No hay libros disponibles en este momento',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'Libros disponibles encontrados',
            data: librosDisponibles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar libros disponibles',
            error: error.message
        });
    }
});

// Ruta para obtener un libro específico por ID
router.get('/:id', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        
        if (!libro) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Libro encontrado',
            data: libro
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar el libro',
            error: error.message
        });
    }
});

// Ruta para obtener los autores de un libro específico
router.get('/:id/autores', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        
        if (!libro) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        // Buscar los autores del libro en la colección de Autores
        const autores = await mongoose.connection.collection('Autores')
            .find({ nombre: { $in: libro.autores } })
            .toArray();

        res.status(200).json({
            success: true,
            message: 'Autores del libro encontrados',
            data: autores
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar los autores del libro',
            error: error.message
        });
    }
});

module.exports = router;