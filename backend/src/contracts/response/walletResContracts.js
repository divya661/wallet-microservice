const yup = require('yup');

const setupWalletResponseContract = yup.object().shape({
  id: yup.string().uuid().required(),
  balance: yup.number().positive().required(),
  name: yup.string().required(),
  date: yup.string().required(),
  transactionId: yup.string().uuid().required()
});

const getWalletDetailsResponseContract = yup.object().shape({
  id: yup.string().uuid().required(),
  balance: yup.number().positive().required(),
  name: yup.string().required(),
  date: yup.string().required()
});

module.exports = {
  setupWalletResponseContract,
  getWalletDetailsResponseContract
};
