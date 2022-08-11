const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
console.log(process.env);

//Crear el servidor de express
const app = express();

// Bbase de datos:
dbConnection();

//Cors
app.use(cors());

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos

app.use('/api/events', require('./routes/events'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(` Servidor corriendo en el puerto ${process.env.PORT}`);
});


