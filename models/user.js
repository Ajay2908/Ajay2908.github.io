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
    codeforces_handle:{
        type:String,
        required:false
    },
    codechef_handle:{
        type:String,
        required:false
    },
    atcoder_handle:{
        type:String,
        required:false
    }
})
module.exports = mongoose.model('User', userschema)