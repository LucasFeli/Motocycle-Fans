const mongoose = require("mongoose");

const MotocycleSchema = new mongoose.Schema({
  marca: {
    type: String,
  
  },
  modelo: {
    type: Number,
   
  },
  motor: {
    type: String,
   
  },
  image: {
    type: String,
    
  },
  description: {
    type: String,
   
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User.model" },
});

module.exports = mongoose.model("Motocycle.model", MotocycleSchema);
