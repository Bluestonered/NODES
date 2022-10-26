module.exports = app => {

    const express = require('express');
    const prizes = require('../controllers/prizes.controllers');
    const router = express.Router();
   
    
    router.get("/", prizes.findAll);

    app.use('/prizes', router);
};