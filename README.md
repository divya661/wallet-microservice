# Wallet System API

This is a simple wallet system backend service that supports the setup of wallets, credit/debit transactions, fetching transactions, and getting wallet details.

## Table of Contents

- [Setup](#setup)
- [API Endpoints](#api-endpoints)
  - [1. Setup Wallet](#1-setup-wallet)
  - [2. Credit/Debit Amount](#2-creditdebit-amount)
  - [3. Fetch Transactions](#3-fetch-transactions)
  - [4. Get Wallet Details](#4-get-wallet-details)
- [Implementation Details](#implementation-details)
  - [1. Directory Structure](#1-directory-structure)
  - [2. Dependencies](#2-dependencies)
  - [3. SQL Queries](#3-sql-queries)
  - [4. Database Configuration](#4-project-configuration-environment-wise)
  - [5. Environment Variables](#5-environment-variables)
  - [6. Deploying to GKE:](#6-deploying-to-gke)

## Setup

- Clone the repository:

   ```bash
   git clone https://github.com/divya661/wallet-system.git
   cd wallet-system
   ```

- Install dependencies:  
```npm install```
- Configure the database:
   Update the `config/default.json` file with your database credentials.
- Run the server:  
```npm run start```

   The server will be running at http://localhost:3000 by default.

## API Endpoints
### 1. **Setup Wallet**

  - **API Endpoint:** `/setup`  
  - **Method:** POST  
  - **Request Body:**  
  ```json
    {
        "balance": 20,
        "name": "Hello world"
    } 
   ``` 

  - **Response:**  
    - **Status Code:** 200  
    - **Response Body:**   
    ```json
        {
            "id": "123456789",
            "balance": 20,
            "transactionId": "4349349843",
            "name": "Hello world",
            "date": "2022-01-12T12:34:56.789Z"
        }
    ``` 

  > **Notes:** Requested balance can be a decimal up to 4 precision points (e.g., 20.5612).  

### 2. **Credit/Debit Amount**  
-  **API Endpoint:** `/transact/:walletId`  
- **Method:** POST  
- **Request Params:**  
```
 walletId: ID of the wallet
```
- **Request Body:**
```json
    {
        "amount": 10.5,
        "description": "Recharge"
    }
```
- **Response**
    - **Status Code:** 200  
    - **Response Body:**  
    ```json
    {
       "balance": 30,
       "transactionId": "12283233111"
    }
    ```  

   > **Notes:**
   - For Credit, the amount will be a positive number. For Debit, it will be a negative number.
   - Amount can be a decimal up to 4 precision points (e.g., 4.1203, 0.321, 1.0045).  

### 3. **Fetch Transaction:**   
- **API Endpoint:** `/transactions?walletId={walletId}&skip={skip}&limit={limit}`  
- **Method:** GET  
- **Query Parameters:**  
    - `walletId: ID of the wallet`  
    - `skip: Number of records to skip (optional, default is 0)`
    - `limit: Maximum number of records to return (optional, default is 10)`

- **Response:**  
   - **Status Code:** 200
   - **Response Body:**
```json
[
  {
    "id": "343434",
    "walletId": "123456789",
    "amount": 2.4,
    "balance": 12.4,
    "description": "Recharge",
    "date": "2022-01-12T12:34:56.789Z",
    "type": "CREDIT"
  },
  {
    "id": "544521",
    "walletId": "123456789",
    "amount": 10,
    "balance": 10,
    "description": "Setup",
    "date": "2022-01-11T11:23:45.678Z",
    "type": "CREDIT"
     }
]
```
> **Notes:** The response includes an array of transactions with properties like `_id`, `walletId`, `amount`, `balance`, `description`, `date`, and `type`.  

### 4. **Get Wallet Details**
- **API Endpoint:** `/wallet/:id`  
- **Method:** GET  
- **Params:**  
   - `id: ID of the wallet`
- **Response:**
   - **Status Code:** 200  
   - **Response Body:**
```json
{
  "id": "123456789",
  "balance": 12.4,
  "name": "Wallet A",
  "date": "2022-01-12T12:34:56.789Z"
}
```

## Implementation Details

### 1. **Directory Structure**
```
/wallet-system
    / backend
        /config
        /src
            /controllers
            /models
            /services
            /routes
            /utils
            /constants
            /errors
            /middleware
            /config
            app.js
        .gitignore
        package.json
        Dockerfile
        docker-compose.yaml
    /frontend

README.md

```

### 2. **Dependencies**
- `express:` Web framework for Node.js
- `sequelize:` ORM for SQL databases
- `mysql2:` MySQL database driver
- `body-parser:` Middleware to parse JSON requests

### 3. **SQL Queries:**
- **Create database & tables:**
```sql 
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
```
- WalletService.js
```sql
-- Inserting a new wallet
INSERT INTO Wallet (balance, name, createdAt, updatedAt)
VALUES (?, ?, NOW(), NOW());

-- Finding a wallet by primary key
SELECT id, balance, name, createdAt, updatedAt
FROM Wallet
WHERE id = ?;
```
- TransactionService.js: 
```sql
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
INSERT INTO Transaction (walletId, amount, description, type, balance, createdAt, updatedAt)
VALUES (?, ?, ?, ?, ?, NOW(), NOW());

-- Committing a transaction
COMMIT;

-- Rolling back a transaction
ROLLBACK;
```

### 4. **Project Configuration environment-wise**  
Configure your database connection in either of `config/default.json`, `config/development.json` or `config/production.json` file based on environment usage.

### 5. **Environment Variables**
Set environment variables for sensitive information like database credentials.

### 6. Deploying to GKE:  
#### Connecting to cluster using gcloud  
- `gcloud container clusters get-credentials wallet-cluster-1 --zone asia-south1`

#### Apply the YAML files using kubectl for docker container image deployment in the cluster:  
- `kubectl apply --validate=true -f mysql-deployment.yaml`  
- `kubectl apply --validate=true -f backend-deployment.yaml`    
- `kubectl apply --validate=true -f frontend-deployment.yaml`  

#### Monitor the deployment:  
- `kubectl get pods -w`  

#### Build, Tag & Pushing into Artifact Registry in GCP:  
- `docker build -f ./prod.Dockerfile -t wallet-service:latest .`  
- `docker build -f ./prod.Dockerfile -t wallet-ui:latest .`  
- `docker tag wallet-service asia-south1-docker.pkg.dev/maximal-mason-411208/wallet/wallet-service:latest`  
- `docker tag wallet-ui asia-south1-docker.pkg.dev/maximal-mason-411208/wallet/wallet-ui:latest`  
- `docker tag mysql asia-south1-docker.pkg.dev/maximal-mason-411208/wallet/mysql:latest`  
- `docker push asia-south1-docker.pkg.dev/maximal-mason-411208/wallet/mysql:latest`  
- `docker push asia-south1-docker.pkg.dev/maximal-mason-411208/wallet/wallet-service:latest`  
- `docker push asia-south1-docker.pkg.dev/maximal-mason-411208/wallet/wallet-ui:latest`  

#### Other useful commands:
- Get all services running in the cluster with there respective internal & external IP & port, etc  
- `kubectl get services -n default`  
- Get all pods info:  
- `kubectl get pods`  
```plaintext
NAME                                  READY   STATUS    RESTARTS   AGE
backend-deployment-f75cbb499-xk5zw    1/1     Running   0          2m34s
frontend-deployment-6f5496cf8-ktdqz   1/1     Running   0          13m
mysql-deployment-5df766c588-p4t8n     1/1     Running   0          4h9m
```
- Watch the logs of the pod:   
- `kubectl logs <pod_name> -f`  

