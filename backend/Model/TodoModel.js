const mongoose = require('mongoose')

const Schema =mongoose.Schema({

    listName : {type :String,required:true},
    readed :{type:Boolean}
})

const TodoDB = mongoose.model('todo-data',Schema)

module.exports= TodoDB