/*
    ROUTES                  ACTION      DESCRIPTION

    api/test/all             GET        Unrestricted access test
    api/test/user            GET        Loggedin users only access test
    api/test/mod             GET        Moderators only access test
    api/test/admin           GET        Admins only access test
    
*/

const { authJwt } = require("../middlewares");


module.exports = app => {
    const controller = require("../controllers/usuario.controller.js");
    
    var router = require("express").Router();
    
    router.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-acess-token, Origin, Content-Type, Accept"
        );

        next();
    });

    router.get("/all", controller.allAccess);

    router.get(
        "/user",
        [ authJwt.verifyToken],
        controller.userBoard 
    );

    router.get(
        "/mod",
        [ authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    router.get(
        "/admin",
        [ authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.use("/api/test", router);


}