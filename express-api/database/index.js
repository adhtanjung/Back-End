const mysql = require("mysql");
const db = mysql.createConnection({
	host: "localhost",
	user: "adhitanjung",
	password: "asd123",
	database: "jc1504",
	port: 3306,
});

module.exports = db;
