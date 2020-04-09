module.exports = (sequelize, Sequelize) => {
    const Perfil = sequelize.define("perfis", {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true
        },
        nome : {
            type : Sequelize.STRING
        }
    });

    return Perfil;
};