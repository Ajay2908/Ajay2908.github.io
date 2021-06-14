const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gmail:{
        type:String,
        required:true
    },
    todoList:{
        type:Array
    }
})
module.exports = mongoose.model('User', userschema)