const polka = require("polka");
const app = polka();

const HTML = `
<html>
	<body>
		<p>Hello, World!</p>
	</body>
</html>
`;

app.get("/", function (req, res) {
  res.end(HTML);
});

app.listen(8080, function mountNotification() {
  console.log("Connect to server on http://localhost:8080/");
});
