let products = [
	{
		id: 1,
		nama: "Apel",
		image:
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-FqVB0I2bP7M%2FU9RLuaLRC2I%2FAAAAAAAAA18%2F0CPwPy-poNE%2Fs1600%2FKandungan-Gizi-Dan-Manfaat-Buah-Apel.jpg&f=1&nofb=1",
		caption: "wah enak apel",
		price: 10000,
	},
	{
		id: 2,
		nama: "Duren",
		image:
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F3.bp.blogspot.com%2F-6NabAIFLkjs%2FUe4wbiyn0yI%2FAAAAAAAAQdM%2FM2VeSCoGni8%2Fs1600%2Fduren.jpg&f=1&nofb=1",
		caption: "wah enak duren",
		price: 20000,
	},
	{
		id: 3,
		nama: "Mangga",
		image:
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.zepto.store%2Fmy%2Fwp-content%2Fuploads%2F2020%2F03%2FMangga-Susu-Susu-Mango.jpg&f=1&nofb=1",
		caption: "wah enak mangga",
		price: 50000,
	},
	{
		nama: "rambutan",
		image:
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.healthbenefitstimes.com%2F9%2Fgallery%2Frambutan%2FPeeled-Rambutan.jpg&f=1&nofb=1",
		caption: "wah enak rambutan",
		price: 30000,
		id: 4,
	},
	{
		nama: "pisang ",
		image:
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwiratech.co.id%2Fwp-content%2Fuploads%2F2018%2F11%2Fmanfaat-Buah-pisang.jpg&f=1&nofb=1",
		caption: "wah enak pisang",
		price: 40000,
		id: 5,
	},
];
const express = require("express");
const { send } = require("process");
const router = express.Router();

router.get("/", (req, res) => {
	console.log(req.query);
	if (req.query.min_price && req.query.max_price) {
		console.log("masuk");
		const filteredPrice = products.filter(
			(val) =>
				val.price >= req.query.min_price && val.price <= req.query.max_price
		);
		res.status(200).send(filteredPrice);
	} else if (req.query.max_price) {
		const maxPrice = products.filter((val) => val.price <= req.query.max_price);
		res.status(200).send(maxPrice);
	} else if (req.query.min_price) {
		const minPrice = products.filter((val) => val.price >= req.query.min_price);
		res.status(200).send(minPrice);
	} else {
		res.status(200).send(products);
	}
});

//* GET PRODUCTS BY ID
router.get("/:id", (req, res) => {
	const getProductById = products.find((val) => val.id == req.params.id);
	if (getProductById) {
		res.status(200).send(getProductById);
	} else {
		res.status(404).send({ status: "Error", message: "User not found" });
	}
});

//* PUSH NEW PRODUCTS
router.post("/", (req, res) => {
	products.push(req.body);
	const reg = products.find((val) => val.id === req.body.id);
	res.status(201).send(reg);
});

//* EDIT PRODUCTS
router.patch("/:id", (req, res) => {
	console.log(req.body);
	let index = products.findIndex((val) => val.id == req.params.id);
	console.log(index);
	// let patched = products.find((val) => val.id == req.params.id);
	products[index] = req.body;
	// patched = req.body;
	res.status(201).send(products);
});

//* DELETE PRODUCTS
router.delete("/:id", (req, res) => {
	console.log(req.params);
	const updatedProducts = products.filter((val) => val.id != req.params.id);
	res.status(201).send(updatedProducts);
});

module.exports = router;
