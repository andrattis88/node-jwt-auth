const db = require("../models");
const PERFIS = db.PERFIS;
const Usuario = db.usuario;

checkDuplicateLoginOrEmail = (req, res, next) => {
    // Login
    Usuario.findOne({ 
        where : { login : req.body.login}
    }).then(usuario => {
        if (usuario) {
            res.status(400).send({
                message : "Failed! Username is already in use!"
            });

            return;
        }

        // Email
        Usuario.findOne({
            where : { email : req.body.login }
        }).then(usuario => {
            if (usuario) {
                res.status(400).send({
                    message : "Failed! Email is already in use!"
                });

                return;
            }    

            next();
        });
    });  
}

checkPerfilExisted = (req, res, next) => {
    if (req.body.perfis) {
        for (let i = 0; i < req.body.perfis.length; i++) {
            if (!PERFIS.includes(req.body.perfis[i])) {
                res.status(400).send({
                    message : "Failed! Role does not exit = " + req.body.perfis[i]
                });

                return;
            }
        }
    }

    next();
}

const verifySignUp = {
    checkDuplicateLoginOrEmail : checkDuplicateLoginOrEmail,
    checkPerfilExisted : checkPerfilExisted
};

module.exports = verifySignUp;

