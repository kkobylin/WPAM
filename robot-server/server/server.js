const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const motors = require('./AlphaBot/motors.js')
const encoders = require('./AlphaBot/encoders.js');
const obstacleAvoidance = require('./AlphaBot/obstacleAvoidance.js');
const camera = require('./AlphaBot/cameraMotors.js')
camera.calibration();

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected.');

    obstacleAvoidance.startObstacleAvoidance((value) => {
        socket.emit('obstacle', value);
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });

    socket.on('move', function(data) {
        movedirection = data;
        // console.log(movedirection);
        switch (movedirection) {
            case "stop":
                // console.log('STOP!');
                motors.stop();
                break;
            case "forward":
                motors.forward(70);
                break;
            case "backward":
                motors.backward(70);
                break;
            case "left":
                motors.left(70);
                break;
            case "right":
                motors.right(70);
                break;
            default:
                console.log('Error: Unknown command!');
        }
    })

    var interval;
    var stop = false;
    var endOfRange = false;
    socket.on('camera', function(data) {

        if (data == 'stop') {

            if (endOfRange == true) {
                endOfRange = false;
                stop = false;
            } else {
                // console.log("STOP KAMERY");
                stop = true;
            }

        } else {

            interval = setInterval(() => {


                if (stop == false && endOfRange == false) {

                    if (data == 'up') {
                        // console.log('Camera UP');
                        endOfRange = !camera.up();
                    } else if (data == 'down') {
                        // console.log('Camera down');
                        endOfRange = !camera.down();
                    }

                } else {

                    // console.log('Clear Interval');
                    stop = false;
                    clearInterval(interval);


                }
            }, 100);
        }
    })

    // end of io.on()
});

server.listen(port, () => {
    console.log(`Server is up on ${port}.`);
});