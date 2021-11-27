const polka = require("polka");

/////////////// GLOBALS ///////////////
/**
 * @NOTE
 * Polka is a light-weight web framework
 * [Documentation can be found here](https://www.npmjs.com/package/polka)
 */
const app = polka();

/** @NOTE this is an example app; we only care about responding, not what we say */
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
 * The Polka framework focuses on simplifying 2 things:
 * 1. Routing:
 * 		accepted here as the first argument
 * 		is a path; any request who's URL matches will be handled
 * 2. Responding:
 * 		the handler callback passed in as the second argument
 * 		makes it easy to respond with `res.end`.
 * 		Data from the `Request` is on the first arg of the callback
 * 		Data that you intend to send can be attached to the second arg of the callback `Response`
 */
app.get("/", function (req, res) {
  res.end(HTML);
});

/////////////// INITIALIZE ///////////////
/** @NOTE Polka does little to simplify the already simple initialize process */
app.listen(8080, function mountNotification() {
  console.log("Connect to server on http://localhost:8080/");
});
