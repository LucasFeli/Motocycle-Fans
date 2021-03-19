const Motocycle = require("../models/motocycle.model")
const User = require("../models/User.model");
const fileParser = require("../config/cloudinary.config")

exports.getMotocycles = async (req, res) => {
    const motocycles = await Motocycle.find();
    res.status(200).json(motocycles);
  };
  
  exports.getMotocycle = async (req, res) => {
    const { motocycleId } = req.params;
    const motocycle = await Motocycle.findById(motocycleId);
    res.status(200).json(motocycle);
  };
  
  exports.createMotocycle = async (req, res) => {
    console.log("SESSION:", req.session.userId)
    const motocycle = await Motocycle.create(req.body);
    await User.findByIdAndUpdate(req.session.userId, {
      $push: { myMotocycles: motocycle._id },
    });
    res.status(200).json(motocycle);
  };

  exports.imageMotocycle = async (req, res) => {
   await fileParser.single('image');
    
    if(!req.file) {
      next(new Error('No file uploaded'));
      return;
    }
    console.log("req.file", req.file)
    res.status(200).json(req.file.path);
    
  };
  
  exports.updateMotocycle = async (req, res) => {
    const { motocycleId } = req.params;
    const motocycle = await Motocycle.findByIdAndUpdate(motocycleId, req.body);
    res.status(200).json(motocycle);
  };
  
  exports.deleteMotocycle = async (req, res) => {
    const { motocycleId } = req.params;
    await Motocycle.findByIdAndDelete(motocycleId);
    res.status(200).json({ message: "Motocycle removed", motocycleId });
  };