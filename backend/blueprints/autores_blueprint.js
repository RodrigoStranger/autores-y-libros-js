// backend/blueprints/autores_blueprint.js
const express = require('express');
const router = express.Router();
const Autor = require('../models/mongo_autores_model');
const verificarToken = require('../../server_auth/authentication');

// Proteger todas las rutas
router.use(verificarToken);

// Obtener todos los autores
router.get('/', async (req, res) => {
    try {
        const autores = await Autor.find();
        console.log("Autores encontrados:", autores); 
        if (autores.length === 0) {
            console.log("No hay autores en la base de datos.");
        }
        res.json(autores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear autor
router.post('/', async (req, res) => {
    try {
        const nuevoAutor = new Autor(req.body); 
        await nuevoAutor.save();
        res.status(201).json(nuevoAutor); 
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});


// Obtener autor por ID
router.get('/:id', async (req, res) => {
    try {
        const autor = await Autor.findById(req.params.id);
        if (!autor) return res.status(404).json({ mensaje: "Autor no encontrado" });
        res.json(autor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar autor
router.put('/:id', async (req, res) => {
    try {
        const autorActualizado = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!autorActualizado) return res.status(404).json({ mensaje: "Autor no encontrado" });
        res.json(autorActualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar autor
router.delete('/:id', async (req, res) => {
    try {
        const autorEliminado = await Autor.findByIdAndDelete(req.params.id);
        if (!autorEliminado) return res.status(404).json({ mensaje: "Autor no encontrado" });
        res.json({ mensaje: "Autor eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
