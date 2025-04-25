const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB conectado a la base de datos AutoresLibros"))
.catch(err => console.error("Error al conectar a la base de datos:", err));

module.exports = mongoose;
