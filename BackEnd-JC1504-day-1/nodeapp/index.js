const http = require("http");

const server = http.createServer((req, res) => {
	console.log(req.url);
	if (res.url === "/") {
		res.writeHead(200, {
			"Content-Type": "text/html",
		});
	}
	res.end("http api");
});

server.listen(2000, () => console.log(`API active at port ${2000}`));
