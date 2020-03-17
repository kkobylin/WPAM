const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.get('/', (req, res) => {
res.send('Chat Server is running on port 3000')
});
io.on('connection', (socket) => {
console.log('user connected')
socket.on('up', function() {
        console.log("up");
        socket.broadcast.emit("up");
    })
socket.on('down', function() {
        console.log("down");
        socket.broadcast.emit("down");
    })
socket.on('right', function() {
        console.log("right");
        socket.broadcast.emit("right");
    })
socket.on('left', function() {
        console.log("left");
        socket.broadcast.emit("left");
    })
	
	
socket.on('messagedetection', (messageContent) => {
       //log the message in console 
       //console.log(senderNickname+" : " +messageContent)
      //create a message object 
      let  message = {"message":messageContent}
       // send the message to all users including the sender  using io.emit() 
      io.emit('message', message )
      })
socket.on('disconnect', function() {
        console.log("disconnected")
        socket.broadcast.emit( "disconnected")
    })
})
server.listen(3000,()=>{

console.log('Node app is running on port 3000')

})