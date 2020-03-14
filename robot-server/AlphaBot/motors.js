var Gpio = require('pigpio').Gpio;
var in1 = new Gpio(12, {mode: Gpio.OUTPUT});
var in2 = new Gpio(13, {mode: Gpio.OUTPUT});
var in3 = new Gpio(20, {mode: Gpio.OUTPUT});
var in4 = new Gpio(21, {mode: Gpio.OUTPUT});
// left motor
var ena = new Gpio(6, {mode: Gpio.OUTPUT});
// right motor
var enb = new Gpio(26, {mode: Gpio.OUTPUT});

// correction used by encoders to keep wheels rotating at same speed
var correction = 36;
var current_speed = 0;

var updateSpeed = function(){
    ena.pwmWrite(current_speed);
    enb.pwmWrite(current_speed+correction);
}

module.exports.updateCorrection = (value) => {
    correction=correction+value;
    console.log(`Correction: ${correction}`);
    enb.pwmWrite(current_speed+correction);
};

module.exports.forward = (speed) =>{
    console.log('Moving forward');
    current_speed = speed;
    updateSpeed()
    in1.digitalWrite(1);
    in2.digitalWrite(0);
    in3.digitalWrite(0);
    in4.digitalWrite(1);
}

module.exports.backward = (speed) =>{
    console.log('Moving backward');
    current_speed = speed;
    updateSpeed()
    in1.digitalWrite(0);
    in2.digitalWrite(1);
    in3.digitalWrite(1);
    in4.digitalWrite(0);
}

module.exports.left = (speed) =>{
    console.log('Moving left');
    current_speed = speed;
    updateSpeed()
    in1.digitalWrite(0);
    in2.digitalWrite(1);
    in3.digitalWrite(0);
    in4.digitalWrite(1);
}

module.exports.right = (speed) =>{
    console.log('Moving right');
    current_speed = speed;
    updateSpeed()
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
