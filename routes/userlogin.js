const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
    res.send('do form here')
})
router.post('/login', async (req, res) => {
    const user = await User.find(req.body.username); // TODO: correct find 
    if(user === null){
        res.send("No user found!")
    }
    try{
        if(await bcrypt.compare(req.body.password,user.password)){
            res.send("success!")
        }
        else{
            res.send('Password Incorrect!')
        }
    }
    catch{
        res.send("Something went wrong!")
    }
})
router.post('/', async (req, res) => {
    const password = await bcrypt.hash(req.body.password,10);
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password : password,
        gmail: req.body.gmail,
        codeforces_handle:req.body.codeforces_handle,
        codechef_handle:req.body.codechef_handle,
        atcoder_handle:req.body.atcoder_handle
    })
    try {
        const u1 = await user.save();
        res.json(u1);

    }
    catch (err) {
        res.send(err);
    }


})

// route.patch('/:id', async (req, res) => {
//     try {
//         const alien = await Alien.findById(req.params.id);
//         alien.sub = req.body.sub;
//         const a1 = await alien.save();
//         res.json(a1);
//     }
//     catch (err) {
//         res.send(err);
//     }

// })
// route.delete('/:id', async (req, res) => {
//     try {
//         const alien = await Alien.findById(req.params.id);
//         const a1 = await alien.remove();
//         res.json(a1);
//     }
//     catch (err) {
//         res.send(err);
//     }
// })
module.exports = router;