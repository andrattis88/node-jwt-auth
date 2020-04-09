const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = exparess();

var corsOptions = {
    origin : "http://localhost:8081"
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended : true}));

const db = require("./app/models");
const Perfil = db.perfil;

db.sequelize.sync({force : true}).then(() => {
    console.log("Drop and Resync Db");
    initial();
});

// To remove when in production
function initial() {
    Perfil.create({id : 1, nome : "usuario"});
    Perfil.create({id : 2, nome : "administrador"});
    Perfil.create({id : 3, nome : "moderador"});
}

// simple route
app.get("/", (req, res) => {
    res.json({ message : "Welcome to the application"});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});