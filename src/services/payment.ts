import Payment from "../db/models/payment";
import User from '../db/models/user';

Payment.belongsTo(User, {
    as: 'user',
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    foreignKeyConstraint: true
});

export class PaymentService {
    /**
     * Data access layer function to register payment
     * @param data activity data to insert
     * @returns inserted activity data
     */
    async create(data: any) {
        try {
            let result = await Payment.create(data);
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    /**
     * Data access layer function to get payment data by id
     * @param id Payment id
     * @returns Payment data
     */
    async getOneById(id: number) {
        try {
            let result = await Payment.findOne(
                {
                    where: { id: id }
                }
            );
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    /**
     * Data access layer function to get user's latest payment
     * @param userId User id
     * @returns latest payment if there's any
     */
    async getOneByUserId(userId: number) {
        try {
            let result = await Payment.findOne(
                {
                    where: { userId: userId },
                    order: ['createdAt', 'DESC']
                }
            );
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    /**
     * Data access layer function to mark payment as paid
     * @param id Payment id
     * @returns Whether update was successful
     */
    async markPaid(id: number) {
        try {
            let result = await Payment.update(
                {
                    paid: true
                },
                {
                    where: { id: id }
                }
            )
            return (result[0] > 0)
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}