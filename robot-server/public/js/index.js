var socket = io();



socket.on('connect', function() {
    console.log('Connected to server');
    // trzeba jakoś inaczej!!!
    jQuery('#obstacle_alert').hide();
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('obstacle', function(value) {
    if (value == true) {
        jQuery('#obstacle_alert').show();
        jQuery('#move_backward').hide();
        socket.emit("move", "stop");
    } else {
        jQuery('#obstacle_alert').hide();
        jQuery('#move_backward').show();
    }

});

window.addEventListener("load", function() { //when page loads
    //we must recognize if it's mobile or desktop client
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var pStart = mobile ? "touchstart" : "mousedown";
    var pEnd = mobile ? "touchend" : "mouseup";

    var move_forward = document.getElementById("move_forward");
    move_forward.addEventListener(pStart, function() {
        socket.emit("move", "forward");
    });
    move_forward.addEventListener(pEnd, function() {
        socket.emit("move", "stop");
    });

    var move_backward = document.getElementById("move_backward");
    move_backward.addEventListener(pStart, function() {
        socket.emit("move", "backward");
    });
    move_backward.addEventListener(pEnd, function() {
        socket.emit("move", "stop");
    });

    var move_left = document.getElementById("move_left");
    move_left.addEventListener(pStart, function() {
        socket.emit("move", "left");
    });
    move_left.addEventListener(pEnd, function() {
        socket.emit("move", "stop");
    });

    var move_right = document.getElementById("move_right");
    move_right.addEventListener(pStart, function() {
        socket.emit("move", "right");
    });
    move_right.addEventListener(pEnd, function() {
        socket.emit("move", "stop");
    });

    var move_stop = document.getElementById("move_stop");
    move_stop.addEventListener("click", function() {
        socket.emit("move", "stop");

    });

    var camera_up = document.getElementById("camera_up");
    camera_up.addEventListener(pStart, function() {
        socket.emit("camera", "up");
    });
    camera_up.addEventListener(pEnd, function() {
        socket.emit("camera", "stop");
    });

    var camera_down = document.getElementById("camera_down");
    camera_down.addEventListener(pStart, function() {
        socket.emit("camera", "down");
    });

    camera_down.addEventListener(pEnd, function() {
        socket.emit("camera", "stop");
    });


});