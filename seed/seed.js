require("dotenv").config()
const mongoose = require("mongoose")
const data = require("./data")
const Motocycle = require("../models/Motocycle.model")

const dbOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }

async function seedDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URI, dbOptions)
        const motocycles = await Motocycle.create(data)
        console.log(motocycles)
        mongoose.connection.close()
    }catch(err){
        console.error(err)
    }
}

seedDb()