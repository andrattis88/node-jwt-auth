const db = require("../models");
const config = require("../config/auth.config,js");
const Usuario = db.usuario;
const Perfil = deb.perfil;

const Op = db.sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save user to database
    Usuario.create({
        login : req.body.login,
        email : req.body.email,
        senha : bcrypt.hashSync(req.body.senha, 8)
    })
        .then(usuario => {
            if (req.body.perfis) {
                Perfil.findAll({ where : { nome : { [Op.or] : req.body.perfis }}})
                    .then(perfis => {
                        usuario.setPerfis(perfis).then(() => {
                            res.send({ message : "User was registered successfully!"});
                        });
                    });
            } else {
                // user role  1
                usuario.setPefis([1]).then(() => {
                    res.send({ message : "User was registered successfully!"});
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message : err.message });
        });
}

exports.signin = (req, res) => {
    Usuario.findOne({ where : { login : req.body.login }})
        .then(usuario => {
            if (!usuario) {
                res.status(404).send({ message : "User not found."});
            }
            
            var senhaIsValid = bcrypt.compareSync(req.body.senha, usuario.senha);

            if (!senhaIsValid) {
                res.status(401).send({
                    accessToken : null,
                    message : "Invalid Password!"
                })
            }

            var token = jwt.sign({ id : usuario.id }, config.secret, { expiresIn : 86400});

            var authorities = [];

            usuario.getPerfis().then(perfis => {
                for (let i = 0; i < perfis.length; i++) {
                    authorities.push("ROLE_" + perfis[i].nome.toUpperCase());
                }
                res.status(200).send({
                    id : usuario.id,
                    login : usuario.login,
                    email : usuario.email,
                    perfis : authorities,
                    accessToken : token 
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message : err.message});
        });
}