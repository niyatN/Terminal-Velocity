const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pnrDetailSchema = new Schema({
    pnrno:String,
    name:String,
    source:String,
    destination:String,
    terminal:String,
    depTime:String,
    airline:String,
    flightno:String
});

module.exports = mongoose.model('pnrDetail', pnrDetailSchema);