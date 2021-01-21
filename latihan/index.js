const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { productRouter, userRouter } = require("./router");
const app = express();
const port = 2005;
const bearerToken = require("express-bearer-token");
const xoauth2 = require("xoauth2");

app.use(cors());
app.use(bodyParser());
app.use(bearerToken());
app.use(express.static("public"));
// app.use(xoauth2());

app.get("/", (req, res) => {
	res.status(200).send("LATIHAN");
});
app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(port, () => console.log("Server listens at port 2005"));
