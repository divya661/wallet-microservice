const yup = require('yup');
const { TRANSACTION_TYPES } = require('../../constants/transactionConstants');

const transactResponseContract = yup.object().shape({
  balance: yup.number().required(),
  transactionId: yup.string().uuid().required()
});

const getTransactionsResponseContract = yup.array().of(
  yup.object().shape({
    id: yup.string().uuid().required(),
    walletId: yup.string().uuid().required(),
    amount: yup.number().required(),
    balance: yup.number().required(),
    description: yup.string().required(),
    date: yup.string().required(),
    type: yup.string().oneOf(Object.values(TRANSACTION_TYPES)).required()
  })
);

module.exports = {
  transactResponseContract,
  getTransactionsResponseContract
};
