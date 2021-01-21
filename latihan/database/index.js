const mysql = require("mysql");

const db = mysql.createConnection({
	host: "localhost",
	user: "adhitanjung",
	password: "asd123",
	port: 3306,
	database: "latihan_db",
});
module.exports = db;
