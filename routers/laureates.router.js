module.exports = app => {

    const express = require('express');
    const laureates = require('../controllers/laureates.controllers');
    const router = express.Router();
   
    
    router.get("/", laureates.findAll);
    /**
     * @swagger
     * /laureates/:
     *   get:
     *      description: Used to get all laureates
     *      tags:
     *          - id,
     *            firstname,
     *            surname,
     *            motivation,
     *            share
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */


    router.get("/nbr", laureates.findNumber);
    /**
     * @swagger
     * /laureates/nbr:
     *   get:
     *      description: Get number of laureates
     *      tags:
     *          - number
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */


    router.get("/multiple", laureates.findDouble);
    /**
     * @swagger
     * /laureates/multiple:
     *   get:
     *      description: Used to get all people that have multiple laureates
     *      tags:
     *          - id,
     *            firstname,
     *            surname,
     *            number
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */
    

    router.get("/page/:page", laureates.findPage);
    /**
     * @swagger
     * /laureates/multiple:
     *   get:
     *      description: Used to get all people that have multiple laureates
     *      tags:
     *          - id,
     *            firstname,
     *            surname,
     *            number
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */

    router.get("/year", laureates.findYear);
    
    router.get("/noYear", laureates.findYearNoLaureate);

    router.get("/year/sort/:signe", laureates.orderlaureate);

    router.get("/supprimer/:id/:annee/:categorie", laureates.delete);

    router.get("/supprimer/:id/:annee/:categorie", laureates.add);

    //ne rien mettre en dessous par ce que l'id fais n'importe quoi
    router.get("/:id", laureates.findId);


    app.use('/laureates', router);
};