var Gpio = require('pigpio').Gpio;
var upDown = new Gpio(27, {mode: Gpio.OUTPUT});
var leftRight = new Gpio(22, {mode: Gpio.OUTPUT});

var currentUpDownAngle = 0;

setUpDown = function(angle){
    // impulse width to be set on servo
    var impulseWidth;
    // checking angle range
    if(angle >= -60 && angle <= 60){

    // counting up or down
    if(angle - currentUpDownAngle > 0){
        interval = -50;
    } else {
        interval = 50;
    }
    console.log(interval);

    // end impulse in a loop
    endImpulse = 1500 + 1000 * -angle/90;
    console.log(endImpulse);

    // first impulse in a loop
    impulseWidth = 1500 + 1000 * -currentUpDownAngle/90;
    console.log(impulseWidth);

    // generating a trajectory
    var timer = setInterval(() => {
                console.log(`Tutaj ${impulseWidth}`);
        upDown.servoWrite(Math.round(impulseWidth))

    // stop conditions
        if(interval<0 && impulseWidth <= endImpulse){
            clearInterval(timer);
            // in order to keep servo in place
            upDown.servoWrite(0);
        }
        if(interval>0 && impulseWidth >= endImpulse){
            clearInterval(timer);
            // in order to keep servo in place
            upDown.servoWrite(0);
        }
        impulseWidth = impulseWidth + interval;
    }, 100);

}
}

var currentLeftRightAngle = 0;

setLeftRight = function(angle){
    // impulse width to be set on servo
    var impulseWidth;
    // checking angle range
    if(angle >= -90 && angle <= 90){

    // counting up or down
    if(angle - currentLeftRightAngle > 0){
        interval = 50;
    } else {
        interval = -50;
    }
    //console.log(interval);

    // end impulse in a loop
    endImpulse = 1500 + 1000 * angle/90;
    //console.log(endImpulse);

    // first impulse in a loop
    impulseWidth = 1500 + 1000 * currentLeftRightAngle/90;
    //console.log(impulseWidth);

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
    }, 100);

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
