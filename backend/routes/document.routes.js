import express from 'express';
import { uploadDocument } from '../controllers/document.controllers.js'
import { uploadMultipleDocuments } from '../middlewares/upload.js'

const router = express.Router();

router.post('/upload', uploadMultipleDocuments, uploadDocument);

export default router;