//var Obstacle = false;

var Gpio = require('onoff').Gpio;
const dl = new Gpio(19, 'in', 'both', {
    debounceTimeout: 10
});
const dr = new Gpio(16, 'in', 'both', {
    debounceTimeout: 10
});

console.log('Obstacle avoidance is active.');

module.exports.startObstacleAvoidance = (callback) => {

    dl.watch((err, value) => {
        if (value == 0) {
            console.log('left obstacle!');
            callback(true);
        } else if (value == 1) {
            console.log('left free!');
            callback(false);
        }

        if (err) {
            throw err;
        }
    });

    dr.watch((err, value) => {
        if (value == 0) {
            console.log('right obstacle!');
        } else if (value == 1) {
            console.log('right free!');
        }
        if (err) {
            throw err;
        }
    });
}