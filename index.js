const express = require("express");
const dotenv = require("dotenv").config();
const cors = require('cors')
const port = process.env.PORT || 4000;

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/ai", require("./routes/openaiRoute"));

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
