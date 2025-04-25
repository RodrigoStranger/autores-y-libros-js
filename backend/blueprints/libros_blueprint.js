// backend/blueprints/libros_blueprint.js
const express = require('express');
const router = express.Router();
const Libro = require('../models/mongo_libros_model');
const verificarToken = require('../../server_auth/authentication'); 

// Proteger todas las rutas
router.use(verificarToken);

// Crear libro
router.post('/', async (req, res) => {
    const libro = new Libro(req.body);
    await libro.save();
    res.status(201).json(libro);
});

// Obtener todos los libros
router.get('/', async (req, res) => {
    const libros = await Libro.find();
    res.json(libros);
});

// Obtener libro por ID
router.get('/:id', async (req, res) => {
    const libro = await Libro.findById(req.params.id);
    res.json(libro);
});

// Actualizar libro
router.put('/:id', async (req, res) => {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(libro);
});

// Eliminar libro
router.delete('/:id', async (req, res) => {
    await Libro.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Libro eliminado" });
});

module.exports = router;
