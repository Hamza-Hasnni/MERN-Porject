const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Connect MongoDB at default port 27017.
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB Connection Succeeded.')
  } catch (error) {
    console.log(`Error in DB connection: ${error.message}`)
    process.exit(1)
  }
}

module.exports = db
