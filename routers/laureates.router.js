module.exports = app => {

    const express = require('express');
    const laureates = require('../controllers/laureates.controllers');
    const router = express.Router();
   
    
    router.get("/", laureates.findAll);

    router.get("/nbr", laureates.findNumber);
    
    router.get("/multiple", laureates.findDouble);

    router.get("/page/:page", laureates.findPage);

    router.get("/year", laureates.findYear);

    //ne rien mettre en dessous par ce que l'id fais n'importe quoi
    router.get("/:id", laureates.findId);


    app.use('/laureates', router);
};