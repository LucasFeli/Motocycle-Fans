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
  .post("/upload",imageMotocycle)
  .get("/:motocycleId", getMotocycle)
  .post("/create", createMotocycle)
  .patch("/:motocycleId", updateMotocycle)
  .delete("/:motocycleId", deleteMotocycle);

module.exports = route;