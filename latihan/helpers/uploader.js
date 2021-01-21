const multer = require("multer");
const fs = require("fs");

const uploader = (destination, fileNamePrefix) => {
	let defaultPath = "./public";

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			const dir = defaultPath + destination;
			if (fs.existsSync(dir)) {
				console.log(dir, "dir exists");
				cb(null, dir);
			} else {
				fs.mkdir(dir, { recursive: true }, (err) => cb(err, dir));
			}
		},
		filename: (req, file, cb) => {
			const originalname = file.originalname;
			const ext = originalname.split(".").pop();
			const filename = fileNamePrefix + Date.now() + "." + ext;
			cb(null, filename);
		},
	});

	const fileFilter = (req, file, cb) => {
		const regex = /\.(jpe?g|gif|bmp|png)$/;
		if (!regex.test(file.originalname.toLowerCase())) {
			return cb(new Error("Only selected file types are allowed"), false);
		}
		return cb(null, true);
	};

	return multer({
		storage,
		fileFilter,
	});
};

module.exports = uploader;
