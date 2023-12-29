import express from "express";
import bodyParser from "body-parser";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const directory = dirname(fileURLToPath(import.meta.url));
// console.log(directory + "/practice.html");

const app = express();
const port = 3000;

const currDirectory = process.cwd(); // Logs: // C:\Users\derek\webDevProjects\miniWebProjects\expressServer
let item = "";
let count = "";

/*Middleware in the context of Express.js refers to functions that have access to the request object (req), 
the response object (res), and the next middleware function in the application's request-response cycle. 
These functions can perform various tasks such as modifying the request and response objects, terminating 
the request-response cycle, or passing control to the next middleware in the stack.

This middleware below is responsible for parsing incoming URL-encoded form data and populating req.body with the parsed data
*/

// Initialize the middleware function
const parseBody = bodyParser.urlencoded({ extended: true });
// Mount the middleware to all incoming requests
app.use(parseBody);

// Adding a second middleware that extracts data from the parsed request body and stores it
app.use((req, res, next) => {
  item = req.body["food"];
  count = req.body["amount"];
  next(); // Required - used to pass control to the next middleware (.use) or a route handler (.get, post, etc.)
});

// Sends the practice.html file to the root of the express application page
app.get("/", (req, res) => {
  res.sendFile(currDirectory + "/practice.html");
});

// Handling a POST request to the "/submit" path by sending an HTML response that includes the data extracted from the parsed request body
app.post("/submit", (req, res) => {
  res.send(
    `<h2>Here is what you entered:<h2>
    <ul>
        <li>Food Item: ${item}</li>
        <li>Quantity: ${count}</li>
    </ul>`
  );
});

// Listen for any opening ports
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
