const express = require('express');
const router = express.Router();
const indexController = require('./../controllers/index');

// Route to create an index
router.post('/createIndex', indexController.createIndex);

// Route to view all indices
router.get('/indices', indexController.viewAllIndices);

module.exports = router;
