var Gpio = require('pigpio').Gpio;
var upDown = new Gpio(27, {mode: Gpio.OUTPUT});
var leftRight = new Gpio(22, {mode: Gpio.OUTPUT});

var currentUpDownAngle = 0;

module.exports.calibration = () => {
    upDown.servoWrite(1500);
    leftRight.servoWrite(1500);
}

setUpDown = function(angle_ud){
    console.log('Test UD: ' +currentUpDownAngle);
    // impulse width to be set on servo
    var mpulseWidth_ud;
    // checking angle range
    if(angle_ud >= -60 && angle_ud <= 60){

    // counting up or down
    if(angle_ud - currentUpDownAngle > 0){
        interval_ud = -10;
    } else {
        interval_ud = 10;
    }
    console.log(interval_ud);

    // end impulse in a loop
    endImpulse_ud = 1500 + 1000 * -angle_ud/90;
    endImpulse_ud = Math.round(endImpulse_ud/10)*10;
    console.log(endImpulse_ud);

    // first impulse in a loop
    impulseWidth_ud = 1500 + 1000 * -currentUpDownAngle/90;
    console.log(impulseWidth_ud);

    // generating a trajectory
    var timerUpDown = setInterval(() => {
                console.log(`Tutaj ${impulseWidth_ud}`);
        upDown.servoWrite(Math.round(impulseWidth_ud))

    // stop conditions
        if(interval_ud<0 && impulseWidth_ud <= endImpulse_ud){
            console.log(`Tutaj zabija iW ${impulseWidth_ud}, eI ${endImpulse_ud}`);
            clearInterval(timerUpDown);
            // in order to keep servo in place
            upDown.servoWrite(0);
        }
        if(interval_ud>0 && impulseWidth_ud >= endImpulse_ud){
            console.log(`Tutaj zabija iW ${impulseWidth_ud}, eI ${endImpulse_ud}`);
            clearInterval(timerUpDown);
            // in order to keep servo in place
            upDown.servoWrite(0);
        }
        impulseWidth_ud = impulseWidth_ud + interval_ud;
    }, 20);

}
}

var currentLeftRightAngle = 0;

setLeftRight = function(angle){
    console.log('Test LR: ' +currentLeftRightAngle);
    // impulse width to be set on servo
    var impulseWidth;
    // checking angle range
    if(angle >= -90 && angle <= 90){

    // counting up or down
    if(angle - currentLeftRightAngle > 0){
        interval = 10;
    } else {
        interval = -10;
    }
    console.log(interval);

    // end impulse in a loop
    endImpulse = 1500 + 1000 * angle/90;
    endImpulse = Math.round(endImpulse/10)*10;
    console.log(endImpulse);

    // first impulse in a loop
    impulseWidth = 1500 + 1000 * currentLeftRightAngle/90;
    console.log(impulseWidth);

    // generating a trajectory
    var timer = setInterval(() => {
        leftRight.servoWrite(Math.round(impulseWidth))

    // stop conditions
        if(interval<0 && impulseWidth <= endImpulse){
            clearInterval(timer);
            // in order to keep servo in place
            leftRight.servoWrite(0);
        }
        if(interval>0 && impulseWidth >= endImpulse){
            clearInterval(timer);
            // in order to keep servo in place
            leftRight.servoWrite(0);
        }
        impulseWidth = impulseWidth + interval;
    }, 20);

}
}

// setting the desired upDownAngle
module.exports.upDownAngle =  (value)=> {
    setUpDown(value);
    currentUpDownAngle = value;
};

// setting the desired leftRightAngle
module.exports.leftRightAngle =  (value)=> {
    setLeftRight(value);
    currentLeftRightAngle = value;
};
