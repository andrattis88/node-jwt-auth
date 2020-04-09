module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuarios", {
        login : {
            type : Sequelize.STRING
        },

        email : {
            type : Sequelize.STRING
        },

        senha : {
            type : Sequelize.STRING 
        }
    });

    return Usuario;
}