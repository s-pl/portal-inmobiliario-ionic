const express = require('express');
const app = express();
const db = require("./models/property.model");
const cors = require('cors');

let corsOptions = {
    origin: ["http://localhost:4200", "http://localhost:8100"]
};

app.use(cors(corsOptions));

// Sincronizar base de datos
db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas del portal inmobiliario
require('./routes/property.routes')(app);

// Ruta de bienvenida
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido al Portal Inmobiliario Español" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor del portal inmobiliario arrancado en el puerto: ${PORT}.`);
});