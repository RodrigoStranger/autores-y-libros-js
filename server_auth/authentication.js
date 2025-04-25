// server_auth/authentication.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function verificarToken(req, res, next) {
    // Obtenemos el token del encabezado Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    // Si no hay token, respondemos con un error
    if (!token) {
        return res.status(401).json({ mensaje: "Token no proporcionado" });
    }

    // Verificamos el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ mensaje: "Token inválido o expirado" });
        }

        // Si el token es válido, lo asignamos al objeto `user` en la solicitud
        req.user = user;
        next(); // Llamamos a `next` para pasar a la siguiente función de la ruta
    });
}

module.exports = verificarToken;
