const {
    setupWalletRequestContract,
    getWalletDetailsContract,
} = require("../../contracts/request/walletReqContracts");
const {
    setupWallet,
    getWalletDetailsById,
} = require("../../services/v1/walletService");
const handleError = require("../../utils/errorUtils");

async function setupWalletController(req, res) {
    try {
        const { body } = req;
        const data = setupWalletRequestContract.validateSync(body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const wallet = await setupWallet(data);
        console.log("wallet createrd", wallet);

        return res.status(200).json(wallet);
    } catch (error) {
        handleError(error, res);
    }
}

async function getWalletDetailsController(req, res) {
    try {
        const {id} = req.params;

        await getWalletDetailsContract.validate({id}, {
            abortEarly: false,
        });
        const wallet = await getWalletDetailsById(id);

        if (!wallet) {
            throw new NotFoundError(`Wallet with ID ${id} not found.`);
        }

        return res.status(200).json(wallet);
    } catch (error) {
        handleError(error, res);
    }
}

module.exports = {
    setupWalletController,
    getWalletDetailsController,
};
