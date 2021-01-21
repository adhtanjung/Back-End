const express = require("express");
const router = express.Router();
const db = require("../database");
const { uploader } = require("../helpers");
const path = "/images";
const upload = uploader(path, "PRD").fields([{ name: "image" }]);
const fs = require("fs");

router.get("/", (req, res) => {
	db.query(`SELECT * FROM products`, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		return res.status(200).send(data);
	});
});

router.post("/", (req, res) => {
	try {
		upload(req, res, (err) => {
			// console.log(req.body);
			const { name, price, stock } = req.body;
			const { image } = req.files;
			const imagePath = image ? `${path}/${image[0].filename}` : null;
			db.query(
				`INSERT INTO products (name,price,stock,imagepath) VALUES ('${name}',${price},${stock},'${imagePath}')`,
				(err, data) => {
					if (err) {
						return res.status(500).send(err.message);
					}
					return res.status(201).send({ id: data.insertId, ...req.body });
				}
			);
			// db.query(
			// 	`INSERT INTO products (name,price,stock) VALUES ('${name}',${price},${stock})`,
			// 	(err, data) => {
			// 		if (err) {
			// 			return res.status(500).send(err.message);
			// 		}
			// 		return res.status(201).send({ id: data.insertId, ...req.body });
			// 	}
			// );
		});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

// router.delete("/:id", (req, res) => {
// 	const id = parseInt(req.params.id);
// 	db.query(`DELETE FROM products WHERE id=${id}`, (err, data) => {
// 		if (err) {
// 			return res.status(500).send(err.message);
// 		}
// 		return res.status(200).send({ message: "DATA_DELETED", status: "DELETED" });
// 	});
// });

// router.patch("/:id", (req, res) => {
// 	try {
// 		const id = req.params.id;
// 		db.query(`SELECT * FROM products WHERE id=${id}`, (err, data) => {
// 			if (err) {
// 				return res.status(500).send(err.message);
// 			}
// 			return res.status(200).send(data[0].imagepath);
// 		});
// 		// let sql = `UPDATE products SET? WHERE id=${id}`;
// 		// db.query(sql, req.body, (err, data) => {
// 		//     if (err) {
// 		//         return res.status(500).send(err.message);
// 		//     }
// 		//     db.query(`SELECT * FROM products WHERE id=${id}`, (err, data) => {
// 		//         if (err) {
// 		//             return res.status(500).send(err.message);
// 		//         }
// 		//         return res.status(200).send(data[0]);
// 		//     });
// 		// });
// 		// upload(req,res,(err)=>{

// 		// })
// 	} catch (err) {}
// });

router.delete("/:id", (req, res) => {
	try {
		const id = parseInt(req.params.id);
		db.query(`SELECT * FROM products WHERE id=${id}`, (err, data) => {
			if (err) {
				return res.status(500).send(err.message);
			}
			fs.unlinkSync(`public${data[0].imagepath}`);
			db.query(`DELETE FROM products WHERE id=${id}`, (err, data) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				return res
					.status(200)
					.send({ message: "DATA_DELETED", status: "DELETED" });
			});
			// return res.status(200).send(data[0].imagepath);
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
});

router.patch("/:id", (req, res) => {
	try {
		const id = req.params.id;
		upload(req, res, (err) => {
			const { name, price, stock } = req.body;
			const { image } = req.files;
			const imagePath = image ? `${path}/${image[0].filename}` : null;
			db.query(`SELECT * FROM products WHERE id=${id}`, (err, data) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				fs.unlinkSync(`public${data[0].imagepath}`);
				db.query(
					`UPDATE products SET name='${name}',price=${price},stock=${stock},imagepath='${imagePath}' WHERE id=${id}`,
					(err, data) => {
						if (err) {
							return res.status(500).send(err.message);
						}
						return res
							.status(200)
							.send({ message: "DATA_PATCHED", status: "PATCHED" });
					}
				);
				// return res.status(200).send(data[0].imagepath);
			});
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
});
module.exports = router;
