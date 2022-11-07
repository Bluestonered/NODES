module.exports = app => {
    const swaggerUi = require("swagger-ui-express");
    const swaggerjsdoc = require("swagger-jsdoc");
    const express = require('express');
    const router = express.Router();

    

    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "API Nobel Prize Made By: Hugo Foulon, Arnaud Chevalm, Samson Dupuy, Lilian Schott",
                version: "1.0.0",
                description:
                    "Les views: http://localhost:3000/laureates/add or http://localhost:3000/category/laureates",
                contact: {
                    name: "API Support",
                },
                servers: ["http://localhost:3000"],
            },
        },
        apis: ["./routers/*.js"],
    };
    
    const specs = swaggerjsdoc(options);
    
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};