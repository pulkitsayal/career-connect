const express = require('express');
const { catchErrors } = require('./errors');
const {login, register} = require('./service');
const router = express.Router();

router.post('/login', catchErrors(async (req, res) => {
    const { email, password } = req.body;
    return res.json(await login(email, password));
}));
  
router.post('/register', catchErrors(async (req, res) => {
    const { email, password, name } = req.body;
    return res.json(await register(email, password, name));
}));

module.exports = router;
