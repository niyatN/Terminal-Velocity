const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const PnrDetail = require('./modals/pnrDetail')
const BoardingGateDetail = require('./modals/boardingGateDetail')
// const airport = require('./maps/dummyAirport')
// import  {airportMatrix}  from './maps/dummyAirport'
const airportMatrix = require('./maps/dummyAirport')
const spawn = require("child_process").spawn;

app.use(cors())

mongoose.connect('mongodb+srv://nikhil:tonypk25@cluster0-zvasu.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("DB Connected!");
  
})

app.get("/pnr-detail",(req,res)=>{
    PnrDetail.find((err, pnrd)=> {
        if (err) return console.error(err);
        console.log(pnrd);
    })
    res.send({"AAA":'SS'})
})

    
    
    
app.get("/pnr-detail/:pnr",(req,res)=>{
    
    var pnr = req.params.pnr;
    PnrDetail.find({ pnrno: pnr }, (err, pnrd)=> {
        if (err) return console.error(err);
        console.log(pnrd);
        res.send(pnrd[0])
        
    })
})


app.get("/entry-gate-detail/:flightno",(req,res)=>{
    var flightno = req.params.flightno;
    console.log(flightno);
    
    BoardingGateDetail.find({flightno:flightno},(err, data)=>{
        if(err) throw err;
        console.log(data[0]);
        res.send(data[0])
    })

})


app.get('/airport-map', (req,res)=>{
    // console.log(airportMatrix)
    res.send(airportMatrix)
})


app.get('/nav-details',(req,res)=>{
    console.log(req.query.airport, req.query.airline,req.query.gateno)
    var process = spawn('python3',["./script/pathFinder.py", req.query.airport, req.query.airline,req.query.gateno] );
    console.log("dd");
    
    process.stdout.on('data', function(data) { 
        console.log(JSON.parse(data.toString()))
        res.send(JSON.parse(data.toString()))
    } ) 
})
app.get("/insert-test",(req, res)=>{
    var test = new BoaringGateDetail({
        source:"String",
        destination:"String",
        terminal:"String",
        depTime:"String",
        airline:"String",
        flightno:"String",
        boardingGateNo:"G",
        entryGateNo:"A"
    })

    test.save((err, data)=>{
        if(err) throw err
        BoaringGateDetail.find((err, test)=> {
            if (err) return console.error(err);
            console.log(test);
            res.send(test[0])
            
        })
    })
})

app.listen(8000, (err)=>{
    if(err) throw err;
    console.log("I am running.....")
})