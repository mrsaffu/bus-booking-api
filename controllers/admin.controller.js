
const Bus = require('../models/Bus')

//! Add Bus
const addBus = async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json({ message: "Bus added successfully", bus });
  } catch (error) {
    res.status(400).json({ message: "Error adding bus", error });
  }
};

//! Update Bus Details
const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.status(200).json({ message: "Bus updated", bus });
  } catch (error) {
    res.status(400).json({ message: "Error updating bus", error });
  }
};

//! Update Route Only
const updateRoute = async (req, res) => {
  try {
    const { source, destination, date, time } = req.body;
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    bus.route = { source, destination, date, time };
    await bus.save();

    res.status(200).json({ message: "Route updated", route: bus.route });
  } catch (error) {
    res.status(400).json({ message: "Error updating route", error });
  }
};

module.exports = {
  addBus,
  updateBus,
  updateRoute

}