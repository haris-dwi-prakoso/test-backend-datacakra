'use strict';
import { DataTypes, Model } from "sequelize";
import connection from "../connection";

interface PaymentAttributes {
    id?: number;
    userId: number;
    amount: number;
    paid: boolean;
    createdAt?: Date,
    updatedAt?: Date
}

class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
    public id!: number;
    public userId!: number;
    public amount!: number;
    public paid!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Payment.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.NUMBER,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    }
}, {
    sequelize: connection,
    modelName: 'Payment',
});

export default Payment;