# Learning Nodejs Web-servers

## 00 - Prerequisites

1. Install Homebrew: https://brew.sh
2. Install `httpie`: `brew install httpie`

## 01 - Node Standard-Library packages

1. Instantiate an http server
2. Respond to requests with an HTML "Hello World"

## 02 - HTTP Framework: Polka

Polka is a minimal express.js (an older, more established alternative) style webserver framework.
[polka](https://www.npmjs.com/package/polka)

1. Install Polka
2. Instantiate an HTTP server using Polka
3. Respond to requests with an HTML "Hello World"

## 03 - Static Assets

Sirv is a minimal static-asset middleware server for express-like webserver frameworks. It's produced by the same developer as `polka`
[sirv](https://www.npmjs.com/package/sirv)

1. Create a new Polka app
2. Create a basic HTML webpage in `/public`
3. Use `sirv` to create a static-asset middleware for the `public` folder
4. Pass the `sirv` middleware into your `app` via `app.use`
5. Go to your webserver in a browser

## 04 - Middleware

/// About middleware

1. Create a new Polka App
2. Create a static-asset server (see 03)
3. Add a _middleware_ function with `app.use`
4. Navigate to your webserver in the browser

## 05 - HTTP Verbs

/// About HTTP verbs

1. Create a new Polka app
2. Mount `/public` to the `/` level of your app
3. Log all incoming requests with an `app.use` _middleware_ function
4. handle `GET` requests to `/` on your app
5. handle `POST` requests to `/` on your app
6. Using `httpie`, make requests to both of your endpoints [(See docs)](https://httpie.io/docs#http-method)
   1. `http localhost:8080/`
   2. `http POST localhost:8080/`

## 06 - Dynamic routing

// About request parameters

1. Create a new Polka app
2. Handle requests to `/api/:name/:location`
   1. Save the `name` and `location` fields from the `req.params` object in variables
   2. Respond with the provided `name` and `location` fields
3. Using `httpie` test your endpoint `/api/:name/:location` by replacing `:name` with your name and `:location` with your own.

## 07 - Server Data

1. Create a new Polka app
2. Create logger middleware
3. Add a USERS collection (Just an empty array)
4. Add a `POST` handler for `/api/:name`
   1. Save the `req.params.name` to the USERS collection
   2. Respond with the user's name and array index as fields in an object
   3. Hint: `.push()` returns the index
5. Add a `GET` handler for `/api`
   1. Respond with the array of USERS
6. Add a `GET` handler for `/api/:name`
   1. Find the user's name in the collection
   2. Respond with the user's name and array index as fields in an object
7. Test your api with `httpie`

## 08 - Response Codes

// About HTTP Response Codes
[HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

1. Set up the app using the same setup as the previous lesson: **07 Server Data**
2. in your `POST /api/:name` handler:
   1. Add a check to ensure `name` includes only ascii alphabetic characters (A-Z)
   2. Respond with `400 Bad Request` if name includes non-alpha characters
3. in your `GET /api/:name` handler:
   1. Respond with `404 Not Found` if `req.params.name` is not in the USERS collection

## 08 - Client / Server interaction

1. Setup a static asset server using Polka
2. Add 4 anchor-tag links to the HTML document body:
   1. Point each link to `/search?q=` and a different name for each
3. In your server, add a handler for the `GET /search` path,
4. Save the value of the `req.query.p` field to a local variable
5. Respond with `{ q: ___ }` replacing `___` with your local variable name
6. Go to your page in a browser and click the links

## 09 - Client / Server interaction with `fetch`

1. Create a new Polka app Static Asset Server
   1. Add a new HTML document with only a script:src tag to your `/public` folder
   2. In the referenced script tag use `fetch` in the client browser to make requests to `/hello`
   3. use the `.then` property chain returned by `fetch` to add a response handler
   4. In the response handler add a new `p` tag to the document body and add the text content from the response body
2. In your server:
   1. Create a new `GET /hello` endpoint that simply replies with `Hello, world"
