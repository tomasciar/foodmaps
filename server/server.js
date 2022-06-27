const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;

// Bypass CORS policy
app.use(cors({ origin: "*" }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/test", (req, res) => {
  res.send({
    message: "Hello World! This test was successful."
  });
});
