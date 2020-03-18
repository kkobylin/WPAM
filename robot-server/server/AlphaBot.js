var Gpio = require('pigpio').Gpio;
var in1 = new Gpio(12, {mode: Gpio.OUTPUT});
var in2 = new Gpio(13, {mode: Gpio.OUTPUT});
var in3 = new Gpio(20, {mode: Gpio.OUTPUT});
var in4 = new Gpio(21, {mode: Gpio.OUTPUT});
var ena = new Gpio(6, {mode: Gpio.OUTPUT});
var enb = new Gpio(26, {mode: Gpio.OUTPUT});


module.exports.forward = (speed) =>{
    console.log('Moving forward');
    ena.pwmWrite(speed);
    enb.pwmWrite(speed)
    in1.digitalWrite(1);
    in2.digitalWrite(0);
    in3.digitalWrite(0);
    in4.digitalWrite(1);
}

module.exports.backward = (speed) =>{
    console.log('Moving backward');
    ena.pwmWrite(speed);
    enb.pwmWrite(speed)
    in1.digitalWrite(0);
    in2.digitalWrite(1);
    in3.digitalWrite(1);
    in4.digitalWrite(0);
}

module.exports.left = (speed) =>{
    console.log('Moving left');
    ena.pwmWrite(speed);
    enb.pwmWrite(speed)
    in1.digitalWrite(0);
    in2.digitalWrite(1);
    in3.digitalWrite(0);
    in4.digitalWrite(1);
}

module.exports.right = (speed) =>{
    console.log('Moving right');
    ena.pwmWrite(speed);
    enb.pwmWrite(speed)
    in1.digitalWrite(1);
    in2.digitalWrite(0);
    in3.digitalWrite(1);
    in4.digitalWrite(0);
}


module.exports.stop = ()=>{
    console.log('Stop');
    in1.digitalWrite(0);
    in2.digitalWrite(0);
    in3.digitalWrite(0);
    in4.digitalWrite(0);
}


//var Obstacle = false;

var onoff = require('onoff').Gpio;
const dl = new onoff(19, 'in', 'both', {debounceTimeout: 10});
// var dr = new Gpio(16, {mode: Gpio.INPUT,
//     pullUpDown: Gpio.PUD_DOWN,
//     edge: Gpio.EITHER_EDGE});
// var dl = new Gpio(19, {mode: Gpio.INPUT,
//     pullUpDown: Gpio.PUD_DOWN,
// });

    // dr.glitchFilter(10000);
    //
    // dr.on('interrupt', (level) => {
    //   if(level === 1){
    //       console.log('Atention right!');
    //   }else if (level === 0 ) {
    //       console.log('You can go');
    //   }
    // });

    // dl.watch((err, value) => {
    //     if(err){
    //         throw err;
    //     }
    //
    //     if(value === 1){
    //         console.log('Go!');
    //     }else{
    //         console.log('Stop!');
    //     }
    // })
