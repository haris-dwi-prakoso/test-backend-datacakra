import { Router } from 'express';
import * as paymentController from '../controllers/payment';
import { auth } from '../middlewares/auth';

export const paymentRouter = Router();

paymentRouter.post('/', auth, paymentController.createPayment);
paymentRouter.put('/:id', auth, paymentController.markAsPaid);