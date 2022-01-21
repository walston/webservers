# Learning Nodejs Web-servers

## 00 - Prerequisites

1. Install Homebrew: https://brew.sh
2. Install `httpie`: `brew install httpie`

## 01 - Node Standard-Library packages

1. Instantiate an http server
2. Respond to requests with an HTML "Hello World"

## 02 - HTTP Framework: Polka

Polka is a minimal express.js (an older, more established alternative) style webserver framework. [polka](https://www.npmjs.com/package/polka)

1. Install Polka
2. Instantiate an HTTP server using Polka
3. Respond to requests with an HTML "Hello World"

## 03 - Static Assets

Sirv is a minimal static-asset middleware server for express-like webserver frameworks. It's produced by the same developer as `polka` [sirv](https://www.npmjs.com/package/sirv)

1. Create a new Polka app
2. Create a basic HTML webpage in `/public`
3. Use `sirv` to create a static-asset middleware for the `public` folder
4. Pass the `sirv` middleware into your `app` via `app.use`
5. Go to your webserver in a browser

## 04 - Middleware

Middleware is software, in the context of http-servers, that lies between the initial HTTP request that came over the wire and the eventual response to be sent back over that wire. The most common pattern for webserver middleware is a simple function

that takes in 3 arguments: Request, Response, and a next callback. the expectation is that next() be called after all processing is done, which will tell the framework calling **your** middleware to call the **"next"** middleware.

The idea is to let as many middleware handles as needed access each request

1. Create a new Polka App
2. Create a static-asset server (see 03)
3. Add a _middleware_ function with `app.use`
4. Navigate to your webserver in the browser

## Primer - Hyper-Text Transfer Protocol: what's it look like?

HTTP is a plain text transfer-protocol, it's totally human-readable

use `curl` to send a request to google.com

```sh
curl --verbose "http://google.com/search?q=foobar"

> GET /search?q=foobar HTTP/1.1
> Host: google.com
> User-Agent: curl/7.64.1
> Accept: */*
>
< HTTP/1.1 301 Moved Permanently
< Location: http://www.google.com/search?q=foobar
< Content-Type: text/html; charset=UTF-8
< Date: Sun, 28 Nov 2021 18:18:35 GMT
< Expires: Tue, 28 Dec 2021 18:18:35 GMT
< Cache-Control: public, max-age=2592000
< Server: gws
< Content-Length: 234
< X-XSS-Protection: 0
< X-Frame-Options: SAMEORIGIN
<
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="http://www.google.com/search?q=foobar">here</A>.
</BODY></HTML>
```

Above we have `>` lines showing the request we've sent and `<` lines showing the response back. Below is an image showing what the different parts of the request are.

![http diagram](pics/http-request.png)

## 05 - HTTP Verbs

So far, our server has been responding to GET requests. In our second lesson we explicitly put `app.get` meaning the handler passed in is triggered exclusively on requests starting with GET. This is the most common type of request, but HTTP specifies other request methods (or verbs) that can send more data in a **request body**. We're going to start handling POST requests, the second most abundant request type, typically associated with saving data onto the server.

1. Create a new Polka app
2. Mount `/public` to the `/` level of your app
3. Log all incoming requests with an `app.use` _middleware_
4. handle `GET` requests to `/` on your app
5. handle `POST` requests to `/` on your app
6. Using `httpie`, make requests to both of your endpoints [(See docs)](https://httpie.io/docs#http-method)
   1. `http localhost:8080/`
   2. `http POST localhost:8080/`

### Play around

Take note of the fact that handlers for different http methods are not executed even though the paths match. Put some console.log calls in your code so you can see what's happening. add in some other verbs to your app.

### Further Reading

- [MDN: HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [w3schools: HTTP Methods](https://www.w3schools.com/tags/ref_httpmethods.asp)

## 06 - Request Bodies

HTTP Requests can have a **request body** of arbitrary text sent with the request, although by convention certain verbs do not. Because the body of a request can contain _any_ text (even binary data) the request's headers ought to include a `Content-Type` specifying what is called a **MIME-type**, this is a string that looks something like `___/___`. Some of the most common MIME-types are `application/x-www-form-urlencoded`, `application/json` and `text/plain`, and in our JavaScript servers, by far the most common would be `application/json`.

To handle request bodies we include simply need another middleware, called a **body-parser**. The parser translates the HTTP request body, which is in a type analogous to a string called a `Buffer`, into a native JavaScript object and attaches it to our `req` argument then passed into our routing handlers. The most well-established package for this is the obviously named `body-parser` so let's install that as well as `polka`.

1. Create a new Polka app
2. require the `body-parser` package and use the `json` middleware [documented here](https://www.npmjs.com/package/body-parser#bodyparsertextoptions)
3. Pass the json body-parser into `app.use` as middleware
4. Create a logger middleware function
   - The arguments a middleware receives are a Request object `req`, a Response object `res`, and a callback to call the next middleware `next`.
   - The concept of middleware expects us to expand upon either the request or response object
   - log the request object's `method`, `url` and `body` properties
5. Pass the logger middleware into app.use _after_ the body-parser (this way it receives the `req` object that has already been modified by json-body-parser)
6. Using httpie send some POST requests with data
   - `http POST localhost:8080/ hello=world`
   - `http POST localhost:8080/hello to_who=world`

## 07 - Persisting Data

Now that we can read request bodies, we should be able to persist them on the server.

1. Create a new Polka app.
2. Include the `body-parser` from the previous lesson
3. Create a request handler function
   - Receives both the `req` and `res` arguments provided to middlewares
   - Read `req.body` and save it to some global variable in your application.
   - Will respond with `Ok` if `res.end()` is called
   - If you do not call `res.end()` the request will hang forever.
4. Pass your request handler function into `app.post("/hello", handler)` to have it respond to requests to `localhost:8080/hello`
5. Use httpie to send some post requests to `localhost:8080/hello`
   - `http POST localhost:8080/hello a=foo b=bar c=baz`

## 08 - Responding with Data

Now that you have data saved in a global variable, it should be straightforward to resond with the list. Let's build a simple application that handles "Users".

There is a concept in data management, CRUD, that describes the 4 basic functions a data-model _could_ implement for storage _at most_: Create, Read, Update, Delete. Historically, HTTP api engineers have mapped these functions 1-to-1 with HTTP methods: GET=read, POST=create, PUT=update, and DELETE=delete. There's nothing forcing this match up, and as you can see in the official docs there are a lot more http methods than CRUD can account for but being aware of this match up can help you understand what other api designers are thinking, so I would recommend committing the associate to memory.

1. Create a new Polka app.
2. Include `body-parser`
3. Create a global `Map` object called `users`
4. Define a request handler function that reads a user off the request body and saves it to the global `users` object, named `createUser`
   - Expect an `id` field to exist on the request body, 
5. Attach the `createUser` handler to `app.post("/users", createUser)`
6. Define a request handler function that responds to a request with an array of all users in the global `users` object
7. Attach the `getUsers` handler to `app.get("/users", getUsers)`
8. Play around with it, sending new users and checking the responses
   - `http POST localhost:8080/users id=001 name=Nathan password=idi0t`
   - `http POST localhost:8080/users id=002 name=Nikki password=s.m.r.t.`
   - `http GET localhost:8080/users`

## 09 - Responding with Granular Data

It's incredibly common to want to get more granular data, meaning finding a single user by ID, rather than asking for the entire list and digging yourself. To handle this, most webserver frameworks provide **route parameters**, defined in the route string as colon-variable-name (e.g. `:id`). Let's expand on our previous example using route params.

1. Copy everything from `08` into a new `09` folder
2. Define a `getUser` request handler function that will use the `req.params.id` to look up the user on the global `users` object
3. Attach the `getUser` function to `app.get("/users/:id", getUsers)`

### Note

Route design isn't an exact science, but one of the most common api routing design-patterns is called REST, where you map data-objects to routes. If you want to read more on API design, Google apigee has a great book on best practices at [Web API Design: The Missing Link (PDF)](https://cloud.google.com/files/apigee/apigee-web-api-design-the-missing-link-ebook.pdf).

### Play around

I've opted for `text/plain` in this lesson so that we don't need to create JSON manually. `httpie` supports sending files instead of `--raw` so make a .json file, change the body parser to `json()` instead of `text()` and send a fancier request body.
`httpie` sends POST requests as json by default, but supports other formats as well. Check out the `body-parser`'s other middlewares and try sending plain text & handling that.

## XX - Response Codes

// About HTTP Response Codes
[HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

1. Set up the app using the same setup as the previous lesson: **07 Server Data**
2. in your `POST /api/:name` handler:
   1. Add a check to ensure `name` includes only ascii alphabetic characters (A-Z)
   2. Respond with `400 Bad Request` if name includes non-alpha characters
3. in your `GET /api/:name` handler:
   1. Respond with `404 Not Found` if `req.params.name` is not in the USERS collection

## XX - Client / Server interaction

1. Setup a static asset server using Polka
2. Add 4 anchor-tag links to the HTML document body:
   1. Point each link to `/search?q=` and a different name for each
3. In your server, add a handler for the `GET /search` path,
4. Save the value of the `req.query.p` field to a local variable
5. Respond with `{ q: ___ }` replacing `___` with your local variable name
6. Go to your page in a browser and click the links

## XX - Client / Server interaction with `fetch`

1. Create a new Polka app Static Asset Server
   1. Add a new HTML document with only a script:src tag to your `/public` folder
   2. In the referenced script tag use `fetch` in the client browser to make requests to `/hello`
   3. use the `.then` property chain returned by `fetch` to add a response handler
   4. In the response handler add a new `p` tag to the document body and add the text content from the response body
2. In your server:
   1. Create a new `GET /hello` endpoint that simply replies with `Hello, world"
