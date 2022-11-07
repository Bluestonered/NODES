module.exports = app => {

    const express = require('express');
    const category = require('../controllers/category.controllers');
    const router = express.Router();
   
    /**
     * @swagger
     * /category/:
     *   get:
     *      description: Used to get Find number laureates per year
     *      tags:
     *          - Find all category
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */
    router.get("/", category.findAll);

    /**
     * @swagger
     * /category/:
     *   get:
     *      description: Used to get Find number laureates per year
     *      tags:
     *          - Find category
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */
    router.get("/count", category.findCount);

    app.use('/category', router);
};