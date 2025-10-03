// backend/controllers/property.controller.js
const Property = require("../models/property.model");
const { generateAIDescription } = require('../services/ai.service');

// Crear propiedad
exports.create = (req, res) => {
    if (!req.body.title || !req.body.price || !req.body.propertyType || !req.body.transactionType) {
        return res.status(400).send({
            message: "Los campos título, precio, tipo de propiedad y tipo de transacción son obligatorios!"
        });
    }

    const property = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        propertyType: req.body.propertyType,
        transactionType: req.body.transactionType,
        bedrooms: req.body.bedrooms,
        city: req.body.city,
        images: req.body.images,
        contactPhone: req.body.contactPhone
    };

    Property.create(property)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al crear la propiedad."
            });
        });
};

// Obtener todas las propiedades
exports.findAll = (req, res) => {
    Property.findAll()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener las propiedades."
            });
        });
};

// Obtener una propiedad por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Property.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `No se encontró la propiedad con id=${id}.`
                });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener la propiedad con id=" + id
            });
        });
};

// Actualizar propiedad
exports.update = (req, res) => {
    const id = req.params.id;

    Property.update(req.body, { where: { id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Propiedad actualizada correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar la propiedad con id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar la propiedad con id=" + id
            });
        });
};

// Eliminar propiedad
exports.delete = (req, res) => {
    const id = req.params.id;

    Property.destroy({ where: { id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Propiedad eliminada correctamente!" });
            } else {
                res.send({ message: `No se pudo eliminar la propiedad con id=${id}` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la propiedad con id=" + id
            });
        });
};

// Generar descripción con IA
exports.createDescriptionWithAI = async (req, res) => {
  const { title, propertyType, transactionType, bedrooms, city } = req.body;

  if (!title || !propertyType || !transactionType || !bedrooms || !city) {
    return res.status(400).send({
      message: "Los campos título, tipo de propiedad, tipo de transacción, número de habitaciones y ciudad son obligatorios para generar la descripción."
    });
  }

  try {
    const aiDescription = await generateAIDescription(title, propertyType, transactionType, bedrooms, city);
    res.send({ description: aiDescription });
  } catch (error) {
    res.status(500).send({
      message: "Error al generar la descripción con IA."
    });
  }
};

