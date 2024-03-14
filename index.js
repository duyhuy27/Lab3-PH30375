import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import distributorsRoute from "./routes/distributorRoute.js";
import fruitsRoute from "./routes/fruitsRoute.js";

const app = express();
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 1432;
const MONGOURL = process.env.MONGO_URL;

// view engine setup
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/dis", (req, res) => {
//   res.render("dis");
// });

// app.get("/fr", (req, res) => {
//   res.render("frmanager");
// });

// app.get("*", (req, res) => {
//   res.status(404).render("404");
// });

// app.use(function (req, res, next) {
//   next(createError(404));
// });

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log("====================================");
      console.log(`Server is running at ${PORT}`);
      console.log(`Click the link to open dashboard ${"http://localhost:1433/"}`);
      console.log("====================================");
    });
  })
  .catch((error) => console.log(error));

app.use("/api/user", route);
app.use("/api/dis", distributorsRoute);
app.use("/api/fr", fruitsRoute);
