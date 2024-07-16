const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const config = require("./config/config");
const productRoutes = require("./routes/productRoutes");
const UserController = require("./controllers/user");
const testimonialRoutes = require("./routes/testimonialRoutes");
const formRoutes = require("./routes/formRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(config.uri)
  .then(() => console.log("mongoDB connected"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("api is working now");
});

app.use("/api/products", productRoutes);

app.post("/signup", UserController.signup);

app.post("/login", UserController.login);

app.use("/testimonials", testimonialRoutes);
app.use("/form", formRoutes);
app.use("*", (req, res) => {
  res.send("invalid endpoints");
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`port is running on localhost ${PORT}`);
});
