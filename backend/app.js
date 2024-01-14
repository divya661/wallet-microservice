const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");

const corsMiddleware = require("./src/middlewares/corsMiddleware");
const loggerMiddleware = require("./src/middlewares/loggerMiddleware");
const errorHandler = require("./src/errors/errorHandler");

const healthRoutes = require("./src/routes/health");
const walletRoutes = require("./src/routes/v1/walletRoutes");
const transactRoutes = require("./src/routes/v1/transactRoutes");
const transactionsRoutes = require("./src/routes/v1/transactionsRoutes");

const app = express();

const environment = process.env.NODE_ENV || "development";
const PORT = config.get('server.port') || 3000;

app.use(bodyParser.json());

app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(errorHandler);

app.use("/", healthRoutes);
app.use("/wallet", walletRoutes);
app.use("/transact",transactRoutes);
app.use("/transactions", transactionsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
