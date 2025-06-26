const mongoose = require('mongoose') ;

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  route: {
    source: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }
  },
  price: { type: Number, required: true }
});

const Bus =  mongoose.model('Bus', busSchema);



module.exports = Bus;
