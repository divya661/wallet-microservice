CREATE DATABASE IF NOT EXISTS wallet;
USE wallet;

CREATE TABLE IF NOT EXISTS Wallets (
    id INT NOT NULL AUTO_INCREMENT,
    balance DECIMAL(10, 4) NOT NULL DEFAULT 0,
    name VARCHAR(255) NOT NULL,
    transactionId UUID DEFAULT UUID(),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Transactions (
    id INT NOT NULL AUTO_INCREMENT,
    amount DECIMAL(10, 4) NOT NULL,
    description VARCHAR(255),
    type ENUM('CREDIT', 'DEBIT') NOT NULL,
    balance DECIMAL(10, 4) NOT NULL,
    createdAt DATETIME NOT NULL,
    walletId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (walletId) REFERENCES Wallet(id)
);

-- Inserting a new wallet
INSERT INTO Wallet (balance, name, createdAt, updatedAt)
VALUES (?, ?, NOW(), NOW());

-- Finding a wallet by primary key
SELECT id, balance, name, createdAt, updatedAt
FROM Wallet
WHERE id = ?;

-- Fetching recent transactions
SELECT id, walletId, amount, balance, description, createdAt, type
FROM Transaction
WHERE walletId = ?
ORDER BY createdAt DESC
LIMIT ? OFFSET ?;

-- Finding a wallet by primary key
SELECT id, balance, name, createdAt, updatedAt
FROM Wallet
WHERE id = ?;

-- Start a transaction
START TRANSACTION;

-- Inserting a new transaction
INSERT INTO Transactions (walletId, amount, description, type, balance, createdAt, updatedAt)
VALUES (?, ?, ?, ?, ?, NOW(), NOW());

-- Committing a transaction
COMMIT;

-- Rolling back a transaction, if commit fails
ROLLBACK;