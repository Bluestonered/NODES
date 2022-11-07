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
     * /laureates/page/{page}:
     *   get:
     *      description: Used to get a page of laureat
     *      tags:
     *          - id,
     *            firstname,
     *            surname,
     *            number
     *      parameters:
     *          - in: path
     *            name: page
     *            schema:
     *              type: integer
     *            required: true
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */

    router.get("/year", laureates.findYear);
     /**
     * @swagger
     * /laureates/year/:
     *   get:
     *      description: Used to get all years and the number of laureate given in that year
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
    
    router.get("/noYear", laureates.findYearNoLaureate);
    /**
     * @swagger
     * /laureates/noYear/:
     *   get:
     *      description: Used to get all years that don't have laureate
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

    router.get("/year/sort/:signe", laureates.orderlaureate);
    /**
     * @swagger
     * /laureates/year/sort/{signe}:
     *   get:
     *      description: Used to order year by they number of laureate (- for asc and + for desc)
     *      tags:
     *          - id,
     *            firstname,
     *            surname,
     *            number
     *      parameters:
     *          - in: path
     *            name: signe
     *            schema:
     *              type: string
     *            required: true
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */

    router.get("/supprimer/:id/:annee/:categorie", laureates.delete);
    /**
     * @swagger
     * /laureates/supprimer/{id]/{annee}/{categorie}:
     *   get:
     *      description: Used to delete a laureate from a specific year, a specific id and  a specific categorie
     *      tags:
     *          - id,
     *            firstname,
     *            surname,
     *            number
     *      parameters:
     *          - in: path
     *            name: id
     *            schema:
     *              type: integer
     *            required: true
     *          - in: path
     *            name: anne
     *            schema:
     *              type: integer
     *            required: true
     *          - in: path
     *            name: categorie
     *            schema:
     *              type: string
     *            required: true
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */
    

    router.get("/supprimer/:id/:annee/:categorie", laureates.add);

    //ne rien mettre en dessous par ce que l'id fais n'importe quoi
    //router.get("/:id", laureates.findId);//NOTE

    router.get("/:id", laureates.updateMotivation);

    app.use('/laureates', router);
};