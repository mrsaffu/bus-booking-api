const express = require("express");
const { addBus, updateBus, updateRoute } = require("../controllers/admin.controller");
const { isAdmin, verifyToken } = require("../middlewares/jwt.middlewares");


const router = express.Router();

router.post('/bus', verifyToken, isAdmin, addBus);
router.put('/bus/:id', verifyToken, isAdmin, updateBus);
router.put('/bus/:id/route', verifyToken, isAdmin, updateRoute);

module.exports= router;
