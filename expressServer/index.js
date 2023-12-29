import express from "express";

const app = express();
const port = 3000;

// req: HTTP request and contains information about the request made by the client (requesting information from the server)
// res: HTTP response server sends when handling HTTP request (server data sent to the client)
app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>"); // sending to the client
});

app.post("/register", (req, res) => {
  res.sendStatus(201);
});

app.put("/user/derek", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/derek", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/derek", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
