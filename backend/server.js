const express = require("express");

const PORT = 8080;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Shall WeTalk!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
