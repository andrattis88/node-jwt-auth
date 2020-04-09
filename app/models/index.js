const config = require ("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB, 
    config.USER, 
    config.PASSWORD,
    {
        host : config.HOST,
        dialect : config.dialect,
        operatorAliases : false,
        pool : {
            max : config.pool.max,
            min : config.pool.min,
            acquire : config.pool.acquire,
            idle: config.pool.idle
        }

    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuario = require("../models/usuario.model.js")(sequelize, Sequelize);
db.perfil = require("../models/perfil.model.js")(sequelize, Sequelize);

db.perfil.belongsToMany(db.usuario, {
    through: "usuarios_perfis",
    foreignKey : "perfil_id",
    otherKey : "usuario_id"
});

db.usuario.belongsToMany(db.perfil, {
    through: "usuarios_perfis",
    foreignKey : "usuario_id",
    otherKey : "perfil_id"
});

db.PERFIS = ["usuario", "administrador", "moderador"];

module.exports = db;