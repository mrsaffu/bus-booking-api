const Bus = require('../models/Bus.js');
const Booking = require('../models/Booking.js');

// 1. Search buses
const searchBuses = async (req, res) => {
    const { source, destination, date } = req.query;
    const query = {};

    if (source) query['route.source'] = source;
    if (destination) query['route.destination'] = destination;
    if (date) query['route.date'] = new Date(date);

    const buses = await Bus.find(query);
    res.json(buses);
};

// 2. Book a bus
const bookBus = async (req, res) => {
    const { busId, seats } = req.body;
    const userId = req.user.id;

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    if (bus.availableSeats < seats) {
        return res.status(400).json({ message: "Not enough seats available" });
    }

    bus.availableSeats -= seats;
    await bus.save();

    const booking = new Booking({
        user: userId,
        bus: busId,
        seatsBooked: seats
    });

    await booking.save();

    res.status(201).json({ message: "Booking confirmed", booking });
};

// 3. Cancel booking
const cancelBooking = async (req, res) => {
    const bookingId = req.params.id;
    const userId = req.user.id;

    const booking = await Booking.findOne({ _id: bookingId, user: userId }).populate('bus');
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Return seats
    const bus = await Bus.findById(booking.bus._id);
    bus.availableSeats += booking.seatsBooked;
    await bus.save();

    await Booking.deleteOne({ _id: bookingId });
    res.json({ message: "Booking cancelled" });
};

// 4. View all bookings
const getUserBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user.id }).populate('bus');
    res.json(bookings);
};

module.exports = {
    searchBuses,
    bookBus,
    cancelBooking,
    getUserBookings
}