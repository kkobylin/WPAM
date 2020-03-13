// test app using AlphaBot module

const AlphaBot = require('./AlphaBot.js')

AlphaBot.forward(80);
setTimeout(()=>AlphaBot.forward(150), 2000);
setTimeout(()=>AlphaBot.forward(200),4000) ;
setTimeout(AlphaBot.stop, 6000);
