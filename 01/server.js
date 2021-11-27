const http = require("http");

const server = http.createServer();
server.listen(8080, function mountNotification() {
  console.log("Connect to the server on http://localhost:8080");
});

const HTML = `
<html>
	<body>
		<p>Hello, World!</p>
	</body>
</html>
`;

/**
 * The Server is based on an API called an `EventEmitter`
 * EventEmitters can attach handlers that will all be executed when
 * the Emitter **triggers** an event.
 * the `on` method is a lot like `addEventListener` in the browser
 */
server.on("request", function handler(request, response) {
  response.end(HTML);
});
