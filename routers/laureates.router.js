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
    router.get("/", laureates.findAll);


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
    router.get("/nbr", laureates.findNumber);


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
    router.get("/multiple", laureates.findDouble);

    
    /**
     * @swagger
     * /laureates/page/:page:
     *
     *   get:
     *          
     *      description: Used to get all people that have multiple laureates
     *      tags:
     *          - page
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
     * /laureates/year/:
     *   get:
     *      description: Used to get Find number laureates per year
     *      tags:
     *          - Find number laureates per year
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
     * /laureates/noYear/:
     *   get:
     *      description: Used to get Find number laureates per year
     *      tags:
     *          - Find years where is not laureate
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
     * /laureates/year/sort/:signe:
     *   get:
     *      description: Used to get Find number laureates per year
     *      tags:
     *          - Find laureates per order
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
     * /laureates/:id/:annee/:categorie:
     *   delete:
     *      description: Used to delete laureat
     *      tags:
     *          - delete laureat
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
     * /laureates/:id/:annee/:categorie:
     *   put:
     *      description: Used to update laureat
     *      tags:
     *          - update laureat
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
     * /laureates/:annee/:categorie:
     *   post:
     *      description: Used to add new laureat
     *      tags:
     *          - add new laureat
     *      responses:
     *          '200':
     *              description: Succes
     *          '500':
     *              description: Internal server error
     *          '400':
     *              description: Bad request
     */
    router.post("/:annee/:categorie", laureates.add); 

    //ne rien mettre en dessous par ce que l'id fais n'importe quoi
    //router.get("/:id", laureates.findId);//NOTE

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
    router.get("/:id", laureates.findId);

    app.use('/laureates', router);
};