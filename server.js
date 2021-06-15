const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userlogin = require('./routes/userlogin')
dotenv.config();
const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.znlfd.mongodb.net/dataDB`
let currentuser;
// console.log(url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection
con.on('open', () => {
    console.log('Database connected...');
})
const PORT = process.env.PORT || 5000;

const app = express()
app.use('/users', userlogin);

app.use(express.json())
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/profile', (req, res) => {
    res.json({ user: currentuser })

})
app.listen(PORT, () => {
    console.log("listening on port 5000");
})