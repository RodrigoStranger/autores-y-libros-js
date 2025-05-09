const express = require('express');
const router = express.Router();
const { mongoose } = require('../models/mongo_connection_pool');
const { Libro } = require('../models/mongo_libros_model');
const { verificarToken } = require('../../server_auth/authentication');

// Ruta para agregar un nuevo libro
router.post('/crear_libro', verificarToken, async (req, res) => {
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
router.get('/', verificarToken, async (req, res) => {
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
router.get('/:id', verificarToken, async (req, res) => {
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
router.get('/:id/autores', verificarToken, async (req, res) => {
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

// Ruta para desactivar un libro
router.put('/:id/desactivar', verificarToken, async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        
        if (!libro) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        // Verificar si el libro ya está desactivado
        if (libro.disponibilidad === false) {
            return res.status(200).json({
                success: true,
                message: 'El libro ya está desactivado',
                data: libro
            });
        }

        // Desactivar el libro usando findByIdAndUpdate
        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            { disponibilidad: false },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Libro desactivado exitosamente',
            data: libroActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al desactivar el libro',
            error: error.message
        });
    }
});

// Ruta para activar un libro
router.put('/:id/activar', verificarToken, async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        
        if (!libro) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        // Verificar si el libro ya está activado
        if (libro.disponibilidad === true) {
            return res.status(200).json({
                success: true,
                message: 'El libro ya está activado',
                data: libro
            });
        }

        // Activar el libro usando findByIdAndUpdate
        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            { disponibilidad: true },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Libro activado exitosamente',
            data: libroActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al activar el libro',
            error: error.message
        });
    }
});

// Ruta para actualizar el título de un libro
router.put('/actualizar/:id/titulo', verificarToken, async (req, res) => {
    try {
        const { titulo } = req.body;

        if (!titulo) {
            return res.status(400).json({
                success: false,
                message: 'El título es requerido'
            });
        }

        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            { titulo },
            { new: true, runValidators: true }
        );

        if (!libroActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Título del libro actualizado exitosamente',
            data: libroActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el título del libro',
            error: error.message
        });
    }
});

// Ruta para actualizar la sinopsis de un libro
router.put('/actualizar/:id/sinopsis', verificarToken, async (req, res) => {
    try {
        const { sinopsis } = req.body;

        if (!sinopsis) {
            return res.status(400).json({
                success: false,
                message: 'La sinopsis es requerida'
            });
        }

        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            { sinopsis },
            { new: true, runValidators: true }
        );

        if (!libroActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Sinopsis del libro actualizada exitosamente',
            data: libroActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la sinopsis del libro',
            error: error.message
        });
    }
});

// Ruta para actualizar otros campos del libro
router.put('/actualizar/:id/detalles', verificarToken, async (req, res) => {
    try {
        const {
            fecha_publicacion,
            disponibilidad,
            paginas,
            generos,
            autores
        } = req.body;

        // Crear objeto con los campos a actualizar
        const camposActualizar = {};
        if (fecha_publicacion) camposActualizar.fecha_publicacion = new Date(fecha_publicacion);
        if (disponibilidad !== undefined) camposActualizar.disponibilidad = disponibilidad;
        if (paginas) camposActualizar.paginas = paginas;
        if (generos) camposActualizar.generos = generos;
        if (autores) camposActualizar.autores = autores;

        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            camposActualizar,
            { new: true, runValidators: true }
        );

        if (!libroActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Libro actualizado exitosamente',
            data: libroActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el libro',
            error: error.message
        });
    }
});

// Ruta para asignar un género a un libro
router.put('/:id/asignar_genero', verificarToken, async (req, res) => {
    try {
        const { genero } = req.body;

        if (!genero) {
            return res.status(400).json({
                success: false,
                message: 'El género es requerido'
            });
        }

        // Verificar si el género existe
        const generoExistente = await mongoose.connection.collection('Generos').findOne({ nombre: genero });
        if (!generoExistente) {
            return res.status(404).json({
                success: false,
                message: 'El género no existe'
            });
        }

        // Obtener el libro actual
        const libroActual = await Libro.findById(req.params.id);
        if (!libroActual) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        // Verificar si el género ya está asignado al libro
        if (libroActual.generos.includes(genero)) {
            return res.status(400).json({
                success: false,
                message: 'Error al asignar el género',
                error: `El género '${genero}' ya está asignado al libro`
            });
        }

        // Verificar que no haya duplicados en los géneros actuales
        const generosUnicos = new Set(libroActual.generos);
        if (generosUnicos.size !== libroActual.generos.length) {
            return res.status(400).json({
                success: false,
                message: 'No se permiten géneros duplicados',
                error: 'El libro ya tiene géneros duplicados'
            });
        }

        // Actualizar el libro con el nuevo género
        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            { $push: { generos: genero } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Género asignado al libro exitosamente',
            data: libroActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al asignar el género al libro',
            error: error.message
        });
    }
});

// Ruta para asignar un autor a un libro
router.put('/:id/asignar_autor', verificarToken, async (req, res) => {
    try {
        const { autor } = req.body;

        if (!autor) {
            return res.status(400).json({
                success: false,
                message: 'El autor es requerido'
            });
        }

        // Verificar si el autor existe
        const autorExistente = await mongoose.connection.collection('Autores').findOne({ nombre: autor });
        if (!autorExistente) {
            return res.status(404).json({
                success: false,
                message: 'El autor no existe'
            });
        }

        // Obtener el libro actual
        const libroActual = await Libro.findById(req.params.id);
        if (!libroActual) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        // Verificar si el autor ya está asignado al libro
        if (libroActual.autores.includes(autor)) {
            return res.status(400).json({
                success: false,
                message: 'Error al asignar el autor',
                error: `El autor '${autor}' ya está asignado al libro`
            });
        }

        // Verificar que no haya duplicados en los autores actuales
        const autoresUnicos = new Set(libroActual.autores);
        if (autoresUnicos.size !== libroActual.autores.length) {
            return res.status(400).json({
                success: false,
                message: 'No se permiten autores duplicados',
                error: 'El libro ya tiene autores duplicados'
            });
        }

        // Actualizar el libro con el nuevo autor
        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            { $push: { autores: autor } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Autor asignado al libro exitosamente',
            data: libroActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al asignar el autor al libro',
            error: error.message
        });
    }
});

module.exports = router;