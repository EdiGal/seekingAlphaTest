const mysql = require("mysql")
const config = require("../config")
const connection = mysql.createConnection({
    host: config.DB_URI,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
});

connection.connect();

module.exports = {
    getConnection: () => connection
}