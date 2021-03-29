const Motocycle = require("../models/motocycle.model");
const User = require("../models/User.model");
const fileParser = require("../config/cloudinary.config");

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
  const motocycle = await Motocycle.create({...req.body, owner:req.session.userId});
  await User.findByIdAndUpdate(req.session.userId, {
    $push: { myMotocycles: motocycle._id },
  });
  res.status(200).json(motocycle);
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
