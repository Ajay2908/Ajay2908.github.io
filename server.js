const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const userlogin = require('./routes/userlogin')
const url = 'mongodb://localhost/userDB'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection
con.on('open', () => {
    console.log('Database connected...');
})

const app = express()
app.use('/users', userlogin);

app.use(express.json())
app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.listen(5000,()=>{
    console.log("listening on port 5000");
})