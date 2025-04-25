// server_auth/authentication.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ mensaje: "Token no proporcionado" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ mensaje: "Token inválido o expirado" });

        req.user = user;
        next();
    });
}

module.exports = verificarToken;
