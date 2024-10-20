const express = require('express');
const router = express.Router();
const docuemntController = require('./../controllers/document');

// Route to create an index
router.post('/addDocument', docuemntController.addDocument);

// Route to view all indices
// router.get('/indices', indexController.viewAllIndices);

module.exports = router;
