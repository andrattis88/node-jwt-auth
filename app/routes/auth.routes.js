/*
    ROUTES                  ACTION      DESCRIPTION

    api/auth/signup          POST       Create a new app user  
    api/auth/signin          POST       Authenticate a user

*/

const { verifySignUp } = require("../middlewares");


module.exports = app => {

    const controller = require("../controllers/auth.controller.js");
    
    var router = require("express").Router();
    
    router.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-acess-token, Origin, Content-Type, Accept"
        );

        next();
    });

    router.post(
        "/signup", 
        [   
            verifySignUp.checkDuplicateLoginOrEmail, 
            verifySignUp.checkPerfilExisted
        ], 
        controller.signup
    );

    router.post("/signin", controller.signin);

    app.use('/api/auth', router);
}