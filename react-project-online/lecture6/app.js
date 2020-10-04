const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();
app.set("port", process.env.NODE_ENV || 8000);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", require("./routes/user"));

app.get("/", (req, res, next) => {
  res.send("Hello node!");
});

app.listen(app.get("port"), () => {
  console.log(`server running on ${app.get("port")}`);
});
