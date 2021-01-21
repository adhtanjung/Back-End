const express = require("express");
const router = express.Router();
const db = require("../database");
const { checkToken, createJWTToken, transporter } = require("../helpers");
const jwt = require("jsonwebtoken");
// const token = createJWTToken()

router.post("/login", (req, res) => {
	const { email, password } = req.body;
	let sql = `SELECT * FROM users WHERE email='${email}' and password = '${password}'`;
	try {
		db.query(sql, (err, data) => {
			const responseData = { ...data[0] };
			const token = createJWTToken(responseData);
			responseData.token = token;
			return res.status(200).send(responseData);
		});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

router.post("/keep-login", checkToken, (req, res) => {
	let sql = `SELECT * FROM users WHERE id=${req.user.id}`;
	try {
		db.query(sql, (err, data) => {
			return res.status(200).send(data[0]);
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
});
router.post("/", (req, res) => {
	const token = createJWTToken(req.body);
	let mailOptions = {
		from: "Tes Node JS <adhtanjung@gmail.com>",
		to: req.body.email,
		subject: "Tes Email NodeJS",
		text: "Halo Dunia!",
		html: `<a href="http://localhost:2005/users/verification?token=${token}" target="_blank">${token}</a>`,
	};

	transporter.sendMail(mailOptions, (err, res2) => {
		if (err) {
			console.log("Error gan!");
			res.send("Error gan!");
		} else {
			console.log("Email sukses terkirim!");
			res.send("Email sukses terkirim!");
		}
	});
});
router.get("/verification", (req, res) => {
	const { token } = req.query;
	const data = jwt.verify(token, "kuncirahasia", (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: err.message,
				status: "Unauthorized",
			});
		}
		return decoded;
	});
	db.query(`SELECT * FROM users WHERE id=${data.id}`, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}

		db.query(
			`UPDATE users SET isverified=1 WHERE id =${data[0].id}`,
			(err, data) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				return res.status(200).send(data);
			}
		);
		// return res.status(200).send(data);
	});
	// router.post("/verified", token, (req, res) => {
	// 	const id = req.user.id;
	// 	db.query(`SELECT * FROM users WHERE id = ${id}`, (err, data) => {
	// 		if (err) {
	// 			return res.status();
	// 		}
	// 	});
	// });
	// if (token) {
	// 	const data = checkToken(token);
	// 	console.log(data);
	// }
	console.log(token);
	// localStorage.setItem("token", token);
	// localStorage.setItem("token", token);
	// console.log(data);
});

module.exports = router;
