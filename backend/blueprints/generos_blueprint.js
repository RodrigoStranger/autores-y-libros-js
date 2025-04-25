const express = require('express');
const router = express.Router();
const Genero = require('../models/mongo_generos_model');
const verificarToken = require('../../server_auth/authentication');

// Proteger todas las rutas
router.use(verificarToken);

// Crear género
router.post('/', async (req, res) => {
    const genero = new Genero(req.body);
    await genero.save();
    res.status(201).json(genero);
});

// Obtener todos los géneros
router.get('/', async (req, res) => {
    const generos = await Genero.find();
    res.json(generos);
});

// Obtener género por ID
router.get('/:id', async (req, res) => {
    const genero = await Genero.findById(req.params.id);
    res.json(genero);
});

// Actualizar género
router.put('/:id', async (req, res) => {
    const genero = await Genero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(genero);
});

// Eliminar género
router.delete('/:id', async (req, res) => {
    await Genero.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Género eliminado" });
});

module.exports = router;
