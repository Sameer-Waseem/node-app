const express = require("express");
const mongoose = require("mongoose");

const genres = require("./routes/genres");
const customers = require("./routes/customers");

const app = express();
require("./startup/prod")(app);

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/genre", genres);
app.use("/api/customer", customers);

const port = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://sameerwaseem:sameer123@vidly.fbjbeoz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Could not connected to MongoDB...", error));

app.listen(port, () => console.log(`Listening on port ${port}...`));
