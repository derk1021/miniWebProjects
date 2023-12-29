import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let password = "";
let realPassword = "ILoveProgramming";

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // console.log(req.body);
  // console.log(res.contentType.apply());
  password = req.body["password"];
  next();
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

app.post("/check", (req, res) => {
  // console.log(req.body);
  if (password == realPassword) {
    res.sendFile(process.cwd() + "/secret.html");
  } else {
    res.send("Try again!");
  }
});

app.listen(port, () => {
  console.log("Listening for port:", port);
});
