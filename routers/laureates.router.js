module.exports = app => {

    const express = require('express');
    const laureates = require('../controllers/laureates.controllers');
    const router = express.Router();
   
    /**
     * @swagger
     * /laureates/:
     *   get:
     *      description: Used to get all laureates
     *      tags:
     *          - Get all laureates
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */ 
    router.get("/", laureates.findAll);


    /**
     * @swagger
     * /laureates/nbr:
     *   get:
     *      description: Get number of laureates
     *      tags:
     *          - Number of laureates
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
     *      description: Used to get number of laureates
     *      tags:
     *          - Number of laureates
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
     *
     *   get:
     *      description: Used to get all people that have multiple laureates
     *      tags:
     *          - Get multiple laureate people
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
     *          - page
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
     *          - Laureates by year
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
     *          - Year with no laureate
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
     *          - Sort year
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

    router.delete("/:id/:annee/:categorie", laureates.delete);
    /**
     * @swagger
     * /laureates/{id}/{annee}/{categorie}:
     *   delete:
     *      description: Used to delete laureat
     *      tags:
     *          - Delete a laureat
     *      parameters:
     *          - in: path
     *            name: id
     *            schema:
     *              type: integer
     *            required: true
     *          - in: path
     *            name: annee
     *            schema:
     *              type:  integer
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

    router.put("/:id/:annee/:categorie", laureates.update);
    /**
     * @swagger
     * /laureates/{id}/{annee}/{categorie}:
     *   put:
     *      description: Used to update laureat
     *      tags:
     *          - Update a laureat
     *      parameters:
     *          - in: path
     *            name: id
     *            schema:
     *              type: integer
     *            required: true
     *          - in: path
     *            name: annee
     *            schema:
     *              type:  integer
     *            required: true
     *          - in: path
     *            name: categorie
     *            schema:
     *              type: string
     *            required: true
     *      requestBody:
     *         content:
     *              motivation:
     *                  schema:
     *                   type: string
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */

    router.post("/:annee/:categorie", laureates.add);
        /**
     * @swagger
     * /laureates/{annee}/{categorie}:
     *   post:
     *      description: Used to update laureat
     *      tags:
     *          - add new laureat
     *      parameters:
     *          - in: path
     *            name: annee
     *            schema:
     *              type:  integer
     *            required: true
     *          - in: path
     *            name: categorie
     *            schema:
     *              type: string
     *            required: true
     *          - in: header
     *            name: firstname
     *            schema:
     *              type: string
     *            required: true
     *          - in: header
     *            name: surname
     *            schema:
     *              type: string
     *            required: false
     *          - in: header
     *            name: motivation
     *            schema:
     *              type: string
     *            required: false
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */

    //ne rien mettre en dessous par ce que l'id fais n'importe quoi
    //router.get("/:id", laureates.findId);//NOTE

    
    router.get("/:id", laureates.findId);
    /**
     * @swagger
     * /laureates/:id:
     *   post:
     *      description: Used to get Find number laureates per year
     *      tags:
     *          - Find laureates with ID
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */

    app.use('/laureates', router);
};