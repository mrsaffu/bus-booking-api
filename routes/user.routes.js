const express = require('express')
const {
    searchBuses,
    bookBus,
    cancelBooking,
    getUserBookings
} = require('../controllers/user.controller.js');
const { verifyToken } = require('../middlewares/jwt.middlewares.js');



const router = express.Router();

router.get('/search', verifyToken, searchBuses);
router.post('/book', verifyToken, bookBus);
router.delete('/cancel/:id', verifyToken, cancelBooking);
router.get('/bookings', verifyToken, getUserBookings);

module.exports = router;
