const { Router } = require("express");
const route = Router()
const fileParser = require("../config/cloudinary.config");

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
  .post('/upload', fileParser.single('image'), (req, res, next) => {
    console.log('req.file', req.file);
    if(!req.file) {
      next(new Error('No file uploaded'));
      return;
    }
    res.json(req.file.path);
  })
  .put("/:motocycleId", updateMotocycle)
  .delete("/:motocycleId", deleteMotocycle);

module.exports = route;