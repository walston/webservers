const polka = require("polka");
const sirv = require("sirv");

/////////////// GLOBALS ///////////////
const app = polka();
/**
 * @NOTE
 * Sirv is a lightweight static-asset middleware
 * [Documentation can be found here](https://www.npmjs.com/package/sirv) */
const assets = sirv("public");
/**
 * @NOTE
 * Static Assets are just regular files, they get a fancy
 * term when we're talking about servers because we want
 * to specify that they are not Templates, which need processing,
 * and can be served exactly as is.
 *
 * The benefit of this approach is that we can now avoid
 * typing out HTML or CSS in javascript strings
 * (as we did in ex-01 and 02), instead we can write them
 * in their native formats and have our server find the files
 * to be served up by itself.
 */

/////////////// APP LOGIC ///////////////
app.use(assets);

/////////////// INITIALIZE ///////////////
app.listen(8080, function mountNotification() {
  console.log("Connect to server on http://localhost:8080/");
});
