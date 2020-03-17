const Motors = require('./AlphaBot/motors.js');
const ObstacleAvoidance = require('./AlphaBot/obstacleAvoidance');
const Encoders = require('./AlphaBot/encoders');
const CameraMotors = require('./AlphaBot/cameraMotors');

CameraMotors.calibration();

setTimeout(() => {

    CameraMotors.upDownAngle(45);
    CameraMotors.leftRightAngle(45);
}, 2000)
// //
setTimeout(() => {
    CameraMotors.upDownAngle(0);
    CameraMotors.leftRightAngle(0)
}, 4000)


Motors.backward(200);
// setTimeout(()=>Motors.forward(100), 2000);
// setTimeout(()=>Motors.forward(200),4000) ;
setTimeout(Motors.stop, 3000);
