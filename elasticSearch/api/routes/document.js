const express = require('express');
const router = express.Router();
const docuemntController = require('./../controllers/document');

router.post('/addDocument', docuemntController.addDocument);
router.post('/addBulkDocument',docuemntController.addBulkDocument);
router.get('/allDocuments',docuemntController.allDocument);
router.get('/GetDocumentIds',docuemntController.GetDocumentIds);

module.exports = router;
