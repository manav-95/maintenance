import Payment from "../models/Payment.js";
import Society from '../models/Society.js'
import User from '../models/User.js'
import PaymentStatus from "../models/PaymentStatus.js";
import mongoose from "mongoose";

export const createPayment = async (req, res) => {
    try {
        const { title, issueDate, dueDate, amount, description, createdBy } = req.body;
        if (!title || !issueDate || !dueDate || !amount || !description || !createdBy) {
            return res.status(400).json({ message: "All Fields are required" })
        }

        // find Manager
        const manager = await User.findById(createdBy)
        if (!manager) return res.status(404).json({ message: "Manager Not Found" })

        // find society based on manager
        const society = await Society.findById(manager.society)
        if (!society) return res.status(404).json({ message: "No Society Found" })

        const payment = await Payment.create({
            title: title,
            issueDate: issueDate,
            dueDate: dueDate,
            amount: amount,
            description: description,
            createdBy: manager._id,
            society: society._id
        })

        await payment.save();

        society.payments.push(payment._id)
        await society.save();

        //create PaymentStatus entries for each member
        const paymentStatusEntries = society.members.map((memberId) => ({
            memberId: memberId,
            paymentId: payment._id,
            status: 'pending',
        }))

        await PaymentStatus.insertMany(paymentStatusEntries);

        return res.status(201).json({ message: "Payment Created Successfully and assigned to members", payment })


    } catch (error) {
        return res.status(500).json({ message: "Failed To Creating Payment" })
    }
}

// Fetch all payments created by a manager
export const getAllPaymentsForManager = async (req, res) => {
    try {
        const { managerId } = req.params;
        const payments = await Payment.find({ createdBy: managerId });
        if (!payments) return res.status(404).json({ message: "No Payments Found" })

        return res.status(200).json({ message: "Payments found SuccessFully", payments })
    } catch (error) {
        return res.status(400).json({ message: "Failed to Fetch Payments", error: error.message })
    }
}

// Fetch all payments for a member with status
export const getPaymentsForMember = async (req, res) => {
    try {
        const { memberId } = req.params;
        
        const memberObjectId = new mongoose.Types.ObjectId(memberId);
        const statuses = await PaymentStatus.find({ memberId: memberObjectId })
            .populate("paymentId")
            .sort({ createdAt: -1 });

        if (!statuses.length) {
            return res.status(400).json({ message: "No payments found", payments: [] });
        }

        // 3️⃣ Convert populated data into clean response objects
        const payments = statuses.map((s) => ({
            id: s._id, // paymentStatus document id
            paymentId: s.paymentId?._id, // Payment id from Payment model
            title: s.paymentId?.title,
            amount: s.paymentId?.amount,
            dueDate: s.paymentId?.dueDate,
            issueDate: s.paymentId?.issueDate,
            description: s.paymentId?.description,
            status: s.status,
            paidAt: s.paidAt,
            amountPaid: s.amountPaid,
        }));


        return res.status(200).json({
            message: "Payments retrieved successfully",
            payments,
        });

    } catch (error) {
        console.error("Error fetching member payments:", error);
        return res.status(500).json({ message: "Failed to fetch payments", error: error.message });
    }
}

