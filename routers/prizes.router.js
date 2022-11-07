module.exports = app => {

    const express = require('express');
    const prizes = require('../controllers/prizes.controllers');
    const router = express.Router();
   
    /**
     * @swagger
     * /prizes/:
     *   get:
     *      description: Used to get Find number laureates per year
     *      tags:
     *          - Find all prizes
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */
    router.get("/", prizes.findAll);

    app.use('/prizes', router);
};