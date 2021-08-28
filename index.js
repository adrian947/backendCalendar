const express = require("express");
require("dotenv").config();
const conectarDB = require('./db/configDB')
const cors = require('cors')

// crear servidor exprees

const app = express();

//conexion a mongo
conectarDB();

//cors
app.use(cors());

//directorio publico
app.use(express.static("public"));

//lectura y parse del body

app.use(express.json())

//rutas

app.use("/api/auth", require("./routes/auth"));
app.use("/api/evento", require("./routes/eventos"));





app.listen(process.env.PORT, () => {
  console.log(`servidor en puerto ${process.env.PORT}`);
});
