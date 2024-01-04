import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let data = {};

app.use(bodyParser.urlencoded({ extended: true }));

// app.use((request, response, next) => {
//   if (request.body && request.body["fName"] && request.body["lName"]) {
//     data["nameLength"] =
//       request.body["fName"].length + request.body["lName"].length;
//   }
//   next();
// });

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  console.log(req.locals);
  data["nameLength"] = req.body["fName"].length + req.body["lName"].length;
  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
