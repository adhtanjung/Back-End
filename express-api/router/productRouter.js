const express = require("express");
const router = express.Router();
const db = require("../database");

// * GET ALL
router.get("/", (req, res) => {
	console.log(req.query);
	if (req.query.min_price & req.query.max_price) {
		db.query(
			`SELECT * FROM products where harga between ${req.query.min_price} and ${req.query.max_price}`,
			(err, data) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				return res.status(200).send(data);
			}
		);
	} else if (req.query.min_price) {
		db.query(
			`SELECT * FROM products where harga >= ${req.query.min_price}`,
			(err, data) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				return res.status(200).send(data);
			}
		);
	} else if (req.query.max_price) {
		db.query(
			`SELECT * FROM products where harga <= ${req.query.max_price}`,
			(err, data) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				return res.status(200).send(data);
			}
		);
	} else {
		db.query(`SELECT * FROM products`, (err, data) => {
			if (err) {
				return res.status(500).send(err.message);
			}
			return res.status(200).send(data);
		});
	}
});

// * GET ID
router.get("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	db.query(`select * from products where id = ${id}`, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		if (data.length === 0) {
			return res.status(404).send("data not found");
		}
		return res.status(200).send(data[0]);
	});
});

// * INSERT
router.post("/", (req, res) => {
	// const object = req.body;
	// let sql = `INSERT INTO products (nama,harga,caption,stock) VALUES ('${object.nama}',${object.harga},'${object.caption}',${object.stock})`;
	let sql = `INSERT INTO products set ?`;
	db.query(sql, req.body, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		return res.status(201).send({ message: "Data Created", status: "Created" });
	});
});

// * DELETE
router.delete("/:id", (req, res) => {
	const id = req.params.id;
	db.query(`DELETE FROM products WHERE id = ${id}`, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}

		return res.status(201).send({ message: "Data Deleted", status: "Deleted" });
	});
});

module.exports = router;
