const express = require('express');

const {
  getRecentTransactionsController
} = require('../../controllers/v1/transactionController');

const router = express.Router();

router.get('/', getRecentTransactionsController);

module.exports = router;
