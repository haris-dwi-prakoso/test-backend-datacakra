import { Request, Response } from 'express';
import { PaymentService } from '../services/payment';
import { CustomRequest } from '../middlewares/auth';
import Payment from '../db/models/payment';

const paymentService = new PaymentService();

export async function createPayment(req: CustomRequest, res: Response) {
    try {
        const userId = req.token['id'];
        let newPayment = new Payment();
        newPayment.userId = userId;
        let result = await paymentService.create(JSON.parse(JSON.stringify(newPayment)));
        if (result) res.status(201).json(JSON.parse(JSON.stringify(result)));
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}

export async function markAsPaid(req: CustomRequest, res: Response) {
    try {
        const userId = req.token['id'];
        const paymentId = Number(req.params.id);
        let payment = await paymentService.getOneById(paymentId);
        if (payment) {
            if (payment.userId == userId) {
                if (!payment.paid) {
                    let result = await paymentService.markPaid(paymentId);
                    if (result) res.status(200).json({ message: "Payment successfully completed" });
                } else res.status(400).json({ message: "Payment was already paid" });
            } else res.status(400).json({ message: "User id mismatch." });
        } else res.status(404).json({ message: "Payment not found." });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}