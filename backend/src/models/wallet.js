const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const { TRANSACTION_TYPES } = require('../constants/transactionConstants');

const Wallet = sequelize.define('Wallet', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  balance: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    defaultValue: 0
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  transactionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

const Transaction = sequelize.define('Transactions', {
  amount: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.ENUM(TRANSACTION_TYPES.CREDIT, TRANSACTION_TYPES.DEBIT),
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  walletId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true
  },
  transactionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  }
});

Wallet.hasMany(Transaction, { foreignKey: 'walletId' });
Transaction.belongsTo(Wallet, { foreignKey: 'walletId' });

sequelize
  .sync()
  .then(() => {
    console.log('Models synchronized with the database.');
  })
  .catch((error) => {
    console.error('Error synchronizing models:', error);
  })
  .finally(() => {
  });

module.exports = { Wallet, Transaction };
