const Motors = require('./motors.js');
const ObstacleAvoidance = require('./obstacleAvoidance');
const Encoders = require('./encoders');
const CameraMotors = require('./cameraMotors');

CameraMotors.upDownAngle(1);
CameraMotors.leftRightAngle(1);

setTimeout(() => CameraMotors.leftRightAngle(-20), 2000)
setTimeout(() => CameraMotors.upDownAngle(20), 2000)

setTimeout(() => CameraMotors.leftRightAngle(1), 10000)
setTimeout(() => CameraMotors.upDownAngle(1), 10000)


// Motors.forward(200);
// // setTimeout(()=>Motors.forward(100), 2000);
// // setTimeout(()=>Motors.forward(200),4000) ;
// setTimeout(Motors.stop, 4000);
