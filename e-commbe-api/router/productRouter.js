const express = require("express");
const router = express.Router();
const db = require("../database");
const _ = require("lodash");

// GET PRODUCTS(ALL)
router.get("/", (req, res) => {
	if (!_.isEmpty(req.query)) {
		return db.query(
			`SELECT * FROM products WHERE isAvailable=0`,
			(err, data) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				return res.status(200).send(data);
			}
		);
	}
	return db.query(`SELECT * FROM products WHERE isAvailable=1`, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		return res.status(200).send(data);
	});
});

// "DELETE"
router.put("/:id", (req, res) => {
	const id = req.params.id;
	db.query(`UPDATE products SET isAvailable=0 WHERE id=${id}`, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		return res
			.status(201)
			.send({ message: "DATA UNAVAILABLE", status: "UNAVAILABLE" });
	});
});

// DELETE PRODUCTS
router.delete("/:id", (req, res) => {
	const id = req.params.id;
	db.query(`DELETE FROM products WHERE id=${id}`, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		return res.status(201).send({ message: "DATA DELETED", status: "DELETED" });
	});
});
module.exports = router;
