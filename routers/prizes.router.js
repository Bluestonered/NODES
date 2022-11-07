module.exports = app => {

    const express = require('express');
    const prizes = require('../controllers/prizes.controllers');
    const router = express.Router();
   

    router.get("/", prizes.findAll);
    /**
     * @swagger
     * /prizes/:
     *   get:
     *      description: Used to find all prizes
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

    app.use('/prizes', router);
};