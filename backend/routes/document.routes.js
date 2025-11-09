import express from 'express';
import { uploadDocument, getAllDocumentsForMembers } from '../controllers/document.controllers.js'
import upload from '../middlewares/uploadMiddleware.js'

const router = express.Router();

router.post('/upload', upload.array('documents', 10), uploadDocument);
router.post('/', getAllDocumentsForMembers)

export default router;