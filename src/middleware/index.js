const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./swager.yaml')
const OpenApiValidator = require('express-openapi-validator')
const express = require('express')

const applyMfddleware = (app) => {

    app.use(express.json());
    app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
    app.use(
        OpenApiValidator.middleware({
            apiSpec: './swager.yaml',
        })
    )
}

module.exports = applyMfddleware;