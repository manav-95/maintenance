import express from 'express'
import { createPayment, getAllPaymentsForManager, getPaymentsForMember } from '../controllers/payment.controllers.js'

const router = express.Router();

router.post('/create', createPayment)
router.get('/manager/:managerId', getAllPaymentsForManager)

router.get('/member/:memberId', getPaymentsForMember)

export default router;