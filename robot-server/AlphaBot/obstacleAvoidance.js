//var Obstacle = false;

var Gpio = require('onoff').Gpio;
const dl = new Gpio(19, 'in', 'both', {debounceTimeout: 10});
const dr = new Gpio(16, 'in', 'both', {debounceTimeout: 10});

const motors = require('./motors.js')

var Obstacle = false;
module.exports.ObstacleDetected;

dl.watch((err, value) => {
    if(value == 0){
        console.log('left obstacle!');
        ObstacleDetected = true;
    }else if (value == 1) {
        console.log('left free!');
        ObstacleDetected = false;
    }

    if (err) {
        throw err;
    }
});

dr.watch((err, value) => {
    if(value == 0){
        console.log('right obstacle!');
        ObstacleDetected = true;
    }else if (value == 1) {
        console.log('right free!');
        ObstacleDetected = false;
    }
    if (err) {
        throw err;
    }
});
