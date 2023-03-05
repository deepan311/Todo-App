const mongoose = require('mongoose')


mongoose.set('strictQuery', true);

const datadb= process.env.DB_URL

const db=mongoose.connect(datadb)

module.exports =db
 


