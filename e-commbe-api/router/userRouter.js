const express = require("express");
const router = express.Router();
const db = require("../database");

// GET USER BY ID
router.get("/:id", (req, res) => {
	const id = req.params.id;

	db.query(`SELECT * FROM users WHERE id=${id}`, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		if (data.length === 0) {
			return res.status(404).send({ message: "DATA NOT FOUND" });
		}
		return res.status(200).send(data[0]);
	});
});

// POST NEW USER
router.post("/", (req, res) => {
	// let sql = `INSERT INTO users set ?`
	console.log(req.body);
	console.log("masuk");
	const { username, email, password } = req.body;
	let sql = `INSERT INTO users (username,email, password, roleID) VALUES ('${username}','${email}','${password}',2)`;
	db.query(sql, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		// return res.status(201).send({ message: "DATA CREATED", status: "CREATED" });
		return res.status(201).send({ id: data.insertId, ...req.body });
	});
});
module.exports = router;
