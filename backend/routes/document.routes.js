import express from 'express';
import { uploadDocument, getAllDocumentsForMembers } from '../controllers/document.controllers.js'
import { uploadMultipleDocuments } from '../middlewares/upload.js'

const router = express.Router();

router.post('/upload', uploadMultipleDocuments, uploadDocument);
router.post('/', getAllDocumentsForMembers)

export default router;