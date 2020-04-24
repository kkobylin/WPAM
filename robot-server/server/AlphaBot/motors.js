var Gpio = require('pigpio').Gpio;
var in1 = new Gpio(12, {
    mode: Gpio.OUTPUT
});
var in2 = new Gpio(13, {
    mode: Gpio.OUTPUT
});
var in3 = new Gpio(20, {
    mode: Gpio.OUTPUT
});
var in4 = new Gpio(21, {
    mode: Gpio.OUTPUT
});
// left motor
var ena = new Gpio(6, {
    mode: Gpio.OUTPUT
});
// right motor
var enb = new Gpio(26, {
    mode: Gpio.OUTPUT
});

// setting the PWM frequency
ena.pwmFrequency(500)
enb.pwmFrequency(500)

// correction used by encoders to keep wheels rotating at same speed
var correction = 0;
var current_speed = 0;

var updateSpeed = function() {
    ena.pwmWrite(current_speed);
    enb.pwmWrite(current_speed + correction);
}

console.log('Main motors are active.');

module.exports.updateCorrection = (value) => {
    correction = correction + value;
    // console.log(`Correction: ${correction}`);
    enb.pwmWrite(current_speed + correction);
};

module.exports.backward = (speed) => {
    current_speed = speed;
    updateSpeed()
    in1.digitalWrite(0);
    in2.digitalWrite(1);
    in3.digitalWrite(1);
    in4.digitalWrite(0);
    // console.log('Moving backward');
}

module.exports.forward = (speed) => {
    current_speed = speed;
    updateSpeed()
    in1.digitalWrite(1);
    in2.digitalWrite(0);
    in3.digitalWrite(0);
    in4.digitalWrite(1);

    // console.log('Moving forward');
}

module.exports.left = (speed) => {

    current_speed = speed;
    updateSpeed()
    in1.digitalWrite(0);
    in2.digitalWrite(1);
    in3.digitalWrite(0);
    in4.digitalWrite(1);

    // console.log('Moving left');
}

module.exports.right = (speed) => {
    current_speed = speed;
    updateSpeed()
    in1.digitalWrite(1);
    in2.digitalWrite(0);
    in3.digitalWrite(1);
    in4.digitalWrite(0);

    // console.log('Moving right');
}


module.exports.stop = () => {
    enb.pwmWrite(0);
    ena.pwmWrite(0);
    in1.digitalWrite(0);
    in2.digitalWrite(0);
    in3.digitalWrite(0);
    in4.digitalWrite(0);
    console.log('Stop');
}