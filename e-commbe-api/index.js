const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { userRouter, productRouter } = require("./router");
const port = 2001;
const app = express();
app.use(cors());
app.use(bodyParser());

app.get("/", (req, res) => {
	res.status(200).send("ecommbe api active");
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.listen(port, () => console.log(`API active at port ${port}`));
