const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const port = 3001;
const routes = require("./routes");

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
