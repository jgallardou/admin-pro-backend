require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors())

//Base de datos
dbConnection();

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});


/* Tu5RHyLHLorofMRQ */
//Rutas
app.get("/", (request, response) => {
    response.json({ text: "un prueba" })
});