const express = require("express");
const router = express.Router();
const db = require("../database");

// GET CART BY USER ID
router.get("/:id", (req, res) => {
	const id = req.params.id;
	db.query(
		`SELECT p.nama,c.quantity, p.harga FROM cart c JOIN products p ON c.productID = p.id WHERE userID = ${id} `,
		(err, data) => {
			return res.status(200).send(data);
		}
	);
});

// POST NEW CART DATA
router.post("/", (req, res) => {
	let sql = `INSERT INTO cart set ?`;
	db.query(sql, req.body, (err, data) => {
		return res.status(201).send({ message: "Data Created", status: "Created" });
	});
});

// UPDATE QTY IN CART
router.patch("/:id", (req, res) => {
	let sql = `UPDATE cart SET quantity=${req.body.quantity} WHERE id=${req.params.id}`;

	db.query(sql, (err, data) => {
		return res.status(201).send({ message: "Data Updated", status: "Updated" });
	});
});

// DELETE CART
router.delete(`/:id`, (req, res) => {
	const id = req.params.id;
	db.query(`DELETE FROM cart WHERE id = ${id}`, (err, data) => {
		return res.status(201).send({ message: "Data Deleted", status: "Deleted" });
	});
});
router.get("/", (req, res) => {
	db.query(`SELECT * FROM cart`, (err, data) => {
		res.status(200).send(data);
	});
});

module.exports = router;
