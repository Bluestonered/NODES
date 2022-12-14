module.exports = app => {

    const express = require('express');
    const category = require('../controllers/category.controllers');
    const router = express.Router();
   

    router.get("/", category.findAll);
        /**
     * @swagger
     * /category/:
     *   get:
     *      description: Used to get all categories
     *      tags:
     *          - F6 Find all categories
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */


    router.get("/count", category.findCount);
    /**
     * @swagger
     * /category/count:
     *   get:
     *      description: Used to find number laureates per categories and order them desc so it show who have the most laureates 
     *      tags:
     *          - F7 Count number laureates by categories 
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */

    // no swagger because it's used for handlebar
    router.get("/laureates", category.findLaureates)


    app.use('/category', router);
};