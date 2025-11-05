import express from 'express';

import { createSociety, addSocietyMembers } from '../controllers/society.controllers.js';

const router = express.Router();

router.post('/create-society', createSociety);
router.post('/add-member', addSocietyMembers);
export default router;