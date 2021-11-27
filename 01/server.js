const http = require("http");

/////////////// GLOBALS ///////////////
/**
 * @NOTE
 * we're using Node's standard-library http package
 * documentation can be found [here](https://nodejs.org/docs/latest-v16.x/api/http.html)
 * though it is incredibly terse. */
const server = http.createServer();
/**
 * @NOTE
 * Few people interact directly with the http package in this way,
 * but I'll introduce it here as is so that you can understand
 * the simplicity a server framework provides, and the energy it saves */

/**
 * @NOTE in our test case, our server doesn't care about anything
 * except responding with some valid HTML, the same HTML every time
 * So we'll define it as a global string constant, once at the top-level */
const HTML = `
<html>
	<body>
		<p>Hello, World!</p>
	</body>
</html>
`;

/////////////// APP LOGIC ///////////////
/**
 * @NOTE
 * The Server class is extended from the `EventEmitter` class.
 * EventEmitters can attach many event-handlers that will all be executed when
 * the Emitter **triggers** the event.
 * the `on` method is a lot like `addEventListener` in the browser
 */
server.on("request", function handler(request, response) {
  response.end(HTML);
});

/////////////// INITIALIZE ///////////////
server.listen(8080, function mountNotification() {
  /** @NOTE it's good practice to announce your server path to the console */
  console.log("Connect to the server on http://localhost:8080");
});
