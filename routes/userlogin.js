const express = require('express')
const session = require('express-session')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')
router.use(express.json())

router.use(session({
    secret: 'inka em led le',
    resave: true,
    saveUninitialized: true
}))

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    }
    catch (err) {
        res.send("error occured!" + err);
    }

})
router.post('/login', async (req, res) => {
    // console.log('Request received')
    const user = await User.findOne({ username: req.body.username }) // TODO: correct find 

    if (user === null) {
        return res.json({ error: "No user found!" })
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.name = user.username;
            res.json(user)
            
        }
        else {
            res.json({ error: "Password Incorrect!" })
        }
    }
    catch {
        res.json({ error: "Something is wrong" })
    }
})
router.get('/session', async (req, res) => {
    return res.send(req.session.name)
})
router.post('/', async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: password,
        gmail: req.body.gmail,
        codeforces_handle: req.body.codeforces_handle,
        codechef_handle: req.body.codechef_handle,
        atcoder_handle: req.body.atcoder_handle
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