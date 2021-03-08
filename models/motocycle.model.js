const mongoose = require("mongoose");

const MotocycleSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: Number,
    required: true,
  },
  motor: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User.model" },
});

module.exports = mongoose.model("Motocycle.model", MotocycleSchema);
