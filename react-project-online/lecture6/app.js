const express = require("express");

const app = express();
app.set("port", process.env.NODE_ENV || 8000);

app.use("/user", require("./routes/user"));

app.get("/", (req, res, next) => {
  res.send("Hello node!");
});

app.listen(app.get("port"), () => {
  console.log(`server running on ${app.get("port")}`);
});
