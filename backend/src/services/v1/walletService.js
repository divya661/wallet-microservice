const NotFoundError = require("../../errors/serverErrors/NotFoundError");
const { Wallet } = require("../../models/wallet");
const { WALLET_NOT_FOUND } = require("../../constants/walletConstants");
const {
    setupWalletResponseContract,
    getWalletDetailsResponseContract,
} = require("../../contracts/response/walletResContracts");

async function setupWallet(body) {
    try {
        const { balance, name } = body;
        const wallet = await Wallet.create({ balance, name });

console.log( wallet);
        return setupWalletResponseContract.cast(
            {
                id: wallet.id,
                balance: wallet.balance,
                name: wallet.name,
                date: new Date(wallet.createdAt).toLocaleString("en-IN"),
                transactionId: wallet.transactionId,
            },
            { stripUnknown: true }
        );
    } catch (error) {
        throw error;
    }
}

async function getWalletDetailsById(walletId) {
    try {
        const wallet = await Wallet.findByPk(walletId);

        if (!wallet) {
            throw new NotFoundError(WALLET_NOT_FOUND);
        }

        return getWalletDetailsResponseContract.cast(
            {
                id: wallet.id,
                balance: wallet.balance,
                name: wallet.name,
                date: new Date(wallet.createdAt).toLocaleString("en-IN"),
            },
            { stripUnknown: true }
        );
    } catch (error) {
        throw error;
    }
}

module.exports = {
    setupWallet,
    getWalletDetailsById,
};
