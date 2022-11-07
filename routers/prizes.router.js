module.exports = app => {

    const express = require('express');
    const prizes = require('../controllers/prizes.controllers');
    const router = express.Router();
   

    router.get("/count/", prizes.findAll);
    /**
     * @swagger
     * /prizes/count/:
     *   get:
     *      description: Count to find all prizes
     *      tags:
     *          - F3 Count all prizes
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