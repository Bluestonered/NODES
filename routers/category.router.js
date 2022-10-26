module.exports = app => {

    const express = require('express');
    const category = require('../controllers/category.controllers');
    const router = express.Router();
   
    
    router.get("/", category.findAll);
    router.get("/count", category.findCount);

    app.use('/category', router);
};