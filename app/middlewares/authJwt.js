const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Usuario = db.usuario;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message : "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message : "Unauthorized!"
            });
        }
    
        req.usuario_id = decoded.id;
    
        next();
    });
}



isAdmin = (req, res, next) => {
    Usuario.findByPk(req.body.usuario_id).then(usuario => {
        usuario.getPerfis().then(perfis => {
            for (let i = 0; i < perfis.length; i++) {
                if (perfis[i].nome === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).semd({
                message : "Require Admin Role!"
            });

            return;
        });
    });
}

isModerator = (req, res, next) => {
    Usuario.findByPk(req.body.usuario_id).then(usuario => {
        usuario.getPerfis().then(perfis => {
            for (let i = 0; i < perfis.length; i++) {
                
                if (perfis[i].nome === "moderator") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message : "Require Moderator Role!"
            });
            
            return;
        });
    });
}

isModeratorOrAdmin = (req, res, next) => {
    Usuario.findByPk(req.body.usuario_id).then(usuario => {
        usuario.getPerfis().then(perfis => {
            for (let i = 0; i < perfis.length; i++) {
                if (perfis[i].nome === "moderator") {
                    next();
                    return;
                }

                if (perfis[i].nome === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message : "Require Moderator or Admin Role!"
            });
            
            return;
        });
    });
}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isModerator : isModerator,
    isModeratorOrAdmin : isModeratorOrAdmin
};

module.exports = authJwt;