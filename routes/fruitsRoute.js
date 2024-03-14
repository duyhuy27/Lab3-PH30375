import express from "express";

import {
  createFruits,
  fetchFruits,
  deleteFruits,
  updateFruits,
  home,
} from "../controller/fruitsController.js";

const fruitsRoute = express.Router();

fruitsRoute.get("/", home);
fruitsRoute.post("/create", createFruits);
fruitsRoute.get("/getAll", fetchFruits);
fruitsRoute.delete("/delete/:id", deleteFruits);
fruitsRoute.put("/update/:id", updateFruits);

export default fruitsRoute;
