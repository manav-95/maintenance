import express from 'express';

import { createSociety } from '../controllers/society.controllers.js';

const router = express.Router();

router.post('/create-society', createSociety);
export default router;