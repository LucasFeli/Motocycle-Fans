require("dotenv").config()
const mongoose = require("mongoose")
const data = require("./data")
const Motocycle = require("../models/motocycle.model")

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
        
        mongoose.connection.close()
    }catch(err){
        console.error(err)
    }
}

seedDb()