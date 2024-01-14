const {
    getTransactionsQueryContract,
    transactRequestContract,
} = require("../../contracts/request/transactionReqContracts");

const {
    transactAmount,
    getRecentTransactions,
} = require("../../services/v1/transactionService");
const handleError = require("../../utils/errorUtils");

async function transactAmountController(req, res) {
    try {
        const { walletId } = req.params;
        const { amount, description } = req.body;

        const data = transactRequestContract.validateSync(
            {
                amount,
                description,
                walletId,
            },
            {
                abortEarly: false,
                stripUnknown: true,
            }
        );

        const result = await transactAmount(data, { amount, description });

        return res.status(200).json(result);
    } catch (error) {
        handleError(error, res);
    }
}

async function getRecentTransactionsController(req, res) {
    try {
        const { walletId } = req.query;
        const skip = req.query.skip || 0;
        const limit = req.query.limit ;

        const data = getTransactionsQueryContract.validateSync(
            { walletId, skip, limit },
            {
                abortEarly: false,
                stripUnknown: true,
            }
        );

        const result = await getRecentTransactions(data);

        return res.status(200).json(result);
    } catch (error) {
        handleError(error, res);
    }
}

module.exports = {
    transactAmountController,
    getRecentTransactionsController,
};
