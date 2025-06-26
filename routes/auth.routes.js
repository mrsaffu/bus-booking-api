const { register, login, refresh } = require("../controllers/auth.controller")
const express = require('express');
const { jwtAuthMiddleware } = require("../middlewares/jwt.middlewares");
const router= express.Router();

router.post('/singup', register)
router.post('/login',login)
router.post('/refresh', refresh);


module.exports= router
