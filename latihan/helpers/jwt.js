const jwt = require("jsonwebtoken");
const createJWTToken = (payload) => {
	return jwt.sign(payload, "kuncirahasia", { expiresIn: "24h" });
};
const checkToken = (req, res, next) => {
	if (req.method !== "OPTIONS") {
		return jwt.verify(req.token, "kuncirahasia", (err, decoded) => {
			if (err) {
				return res.status(401).send({
					message: err.message,
					status: "Unauthorized",
				});
			}
			req.user = decoded;
			next();
		});
	}
};

module.exports = {
	createJWTToken,
	checkToken,
};
