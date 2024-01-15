const yup = require('yup');

const transactRequestContract = yup.object().shape({
  walletId: yup.string('Invalid wallet ID').required('Wallet ID is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .min(-100000, 'Amount should be greater than -100000')
    .max(100000, 'Amount should be less than 100000')
    .required('Amount is required'),
  description: yup
    .string()
    .trim()
    .max(255, 'Description cannot exceed 255 characters')
    .optional()
});

const getTransactionsQueryContract = yup.object().shape({
  walletId: yup.string('Invalid wallet ID').required('Wallet ID is required'),
  skip: yup
    .number()
    .integer('Skip must be an integer')
    .min(0, 'Skip must be greater than or equal to 0')
    .default(0),
  limit: yup
    .number()
    .integer('Limit must be an integer')
    .min(1, 'Limit must be greater than or equal to 1')
    .optional()
});

module.exports = {
  transactRequestContract,
  getTransactionsQueryContract
};
