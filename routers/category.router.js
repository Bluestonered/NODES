module.exports = app => {

    const express = require('express');
    const category = require('../controllers/category.controllers');
    const router = express.Router();
   
    
    router.get("/", category.findAll);

    app.use('/category', router);
};