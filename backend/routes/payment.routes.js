import express from 'express'
import { createPayment, getAllPaymentsForManager, getPaymentsForMember, getPaidMembers } from '../controllers/payment.controllers.js'

const router = express.Router();

router.post('/create', createPayment)
router.get('/manager/:managerId', getAllPaymentsForManager)
router.get('/manager/paid-members/:paymentId', getPaidMembers)

router.get('/member/:memberId', getPaymentsForMember)

export default router;