const { Router } = require("express");
const route = Router()

const{
    getMotocycles,
    getMotocycle,
    createMotocycle,
    imageMotocycle,
    updateMotocycle,
    deleteMotocycle,
}= require("../controllers/motocycle.controlers");


route
  .get("/", getMotocycles)
  .get("/:motocycleId", getMotocycle)
  .post("/create", createMotocycle, imageMotocycle)
  .patch("/:motocycleId", updateMotocycle)
  .delete("/:motocycleId", deleteMotocycle);

module.exports = route;