const { Sequelize } = require("sequelize");
const config = require("config");

const DB_NAME = config.get("database_name");
const DB_PASSWORD = config.get("database_password");
const DB_USERNAME = config.get("database_username");
const DB_HOST = config.get("database_host");
const DB_PORT = config.get("database_port");

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = sequelize;
