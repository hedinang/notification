const express = require('express');
const userService = require('../service/UserService')
const router = express.Router();

router.get('/user', function (req, res) {
    res.send('Hello World!')
})
router.post('/user', async function (req, res) {
    let a = await userService.addUser(req.body);
    res.send('aa')
})

module.exports = router