const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const boardingGateDetailSchema = new Schema({
    source:String,
    destination:String,
    terminal:String,
    depTime:String,
    airline:String,
    flightno:String,
    boardingGateNo:String,
    entryGateNo:String
});

module.exports = mongoose.model('boardingGateDetail', boardingGateDetailSchema);