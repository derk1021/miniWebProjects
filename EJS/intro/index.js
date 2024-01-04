import express from "express";

const app = express();
const port = 3000;

// const weekday = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];
let day = new Date();

app.get("/", (req, res) => {
  let obj;
  if (day.getDay() === 0 || day.getDay() === 6) {
    obj = {
      dayType: "a weekend",
      advice: "have fun",
    };
  } else {
    obj = {
      dayType: "a weekday",
      advice: "work hard",
    };
  }
  //   console.log(obj);
  res.render("index.ejs", obj); // .render is used for rendering dynamic data (template engines) and .send() is for static data
});

app.listen(port, () => {
  console.log("Listening on port:", port);
});
