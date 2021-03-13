const { Router } = require("express");
const route = Router()

const{
    getMotocycles,
    getMotocycle,
    createMotocycle,
    updateMotocycle,
    deleteMotocycle,
}= require("../controllers/motocycle.controlers");


route
  .get("/", getMotocycles)
  .get("/:motocycleId", getMotocycle)
  .post("/create", createMotocycle)
  .patch("/:motocycleId", updateMotocycle)
  .delete("/:motocycleId", deleteMotocycle);

module.exports = route;