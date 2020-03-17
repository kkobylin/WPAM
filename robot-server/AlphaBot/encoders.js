const Motors = require('./motors');
var Gpio = require('onoff').Gpio;
const er = new Gpio(8, 'in', 'both');
const el = new Gpio(7, 'in', 'both');

var el_impulse = 0;
var er_impulse = 0;

el.watch((err, value) => {
    el_impulse++;
    if(el_impulse%1 == 0){
        console.log(`Left: ${el_impulse}`);
    }
    if(el_impulse-er_impulse==2){
        Motors.updateCorrection(1);
        el_impulse = 0;
        er_impulse = 0;
    }
    if(el_impulse-er_impulse==-2){
        Motors.updateCorrection(-1);
        el_impulse = 0;
        er_impulse = 0;
    }
    if (err) {
        throw err;
    }
});

er.watch((err, value) => {
    er_impulse++;
    if(er_impulse%1 == 0){
        console.log(`Right: ${er_impulse}`);
    }
    if (err) {
        throw err;
    }
});
