module.exports = (app) => {

const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/property.controller');

app.use('/api/properties', router);


router.post('/', propertiesController.create);


router.get('/', propertiesController.findAll);


router.get('/:id', propertiesController.findOne);


router.put('/:id', propertiesController.update);


router.delete('/:id', propertiesController.delete);

router.post('/generate-description', propertiesController.createDescriptionWithAI);
}