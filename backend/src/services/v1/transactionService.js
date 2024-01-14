const sequelize = require("../../config/db");
const {
    TRANSACTION_TYPES,
    NO_TRANSACTIONS_FOUND,
} = require("../../constants/transactionConstants");
const NotFoundError = require("../../errors/serverErrors/NotFoundError");
const { Wallet, Transaction } = require("../../models/wallet");
const {
    WALLET_NOT_FOUND,
    WALLET_CANNOT_BE_NEGATIVE,
} = require("../../constants/walletConstants");
const {
    transactResponseContract,
    getTransactionsResponseContract,
} = require("../../contracts/response/transactionResContracts");
const ForbiddenError = require("../../errors/serverErrors/ForbiddenError");

async function transactAmount({ walletId, amount, description }) {
    const t = await sequelize.transaction();
    try {
        const wallet = await Wallet.findByPk(walletId, {
            transaction: t,
        });

        console.log(wallet);

        if (!wallet) {
            throw new NotFoundError(WALLET_NOT_FOUND);
        }

        const transactionType =
            amount >= 0 ? TRANSACTION_TYPES.CREDIT : TRANSACTION_TYPES.DEBIT;
        const updatedBalance = Number(wallet.balance) + amount;
        if (updatedBalance < 0) {
            throw new ForbiddenError(WALLET_CANNOT_BE_NEGATIVE);
        }
        
        await wallet.update({ balance: updatedBalance }, { transaction: t });

        amount = Math.abs(amount);
        const transaction = await Transaction.create(
            {
                walletId,
                amount,
                description,
                type: transactionType,
                balance: updatedBalance,
            },
            {
                transaction: t,
            }
        );

        await t.commit();

        const result = {
            balance: transaction.balance,
            transactionId: transaction.transactionId,
        };

        return transactResponseContract.cast(result, { stripUnknown: true });
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

async function getRecentTransactions({ walletId, skip, limit }) {
    try {
        let queryObj = {
            where: { walletId },
            order: [["createdAt", "DESC"]],
            offset: parseInt(skip, 10) || 0,
        };

        if(limit){
            queryObj["limit"] = parseInt(limit, 10);
        }
        const transactions = await Transaction.findAll(queryObj);

        if (!transactions.length) {
            throw new NotFoundError(NO_TRANSACTIONS_FOUND + walletId);
        }

        const result = transactions.map((transaction) => ({
            id: transaction.transactionId,
            walletId: transaction.walletId,
            amount: transaction.amount,
            balance: transaction.balance,
            description: transaction.description,
            date: new Date(transaction.createdAt).toLocaleString("en-IN"),
            type: transaction.type.toUpperCase(),
        }));
        return getTransactionsResponseContract.cast(result, {
            stripUnknown: true,
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    transactAmount,
    getRecentTransactions,
};
