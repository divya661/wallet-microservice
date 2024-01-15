const express = require('express');
const { transactAmountController } = require('../../controllers/v1/transactionController');

const router = express.Router();

router.post('/:walletId', transactAmountController);

module.exports = router;
