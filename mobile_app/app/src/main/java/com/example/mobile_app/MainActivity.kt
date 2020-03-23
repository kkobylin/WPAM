package com.example.mobile_app

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MotionEvent
import android.view.View
import com.github.nkzawa.emitter.Emitter
import com.github.nkzawa.socketio.client.IO
import com.github.nkzawa.socketio.client.Socket
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.robot_steer_layout.*
import java.net.URISyntaxException

class MainActivity : AppCompatActivity() {

    var moveBackwardEnable = true

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.robot_steer_layout)
        val ipAddress = "192.168.2.109"

        warnText.visibility = View.INVISIBLE

        //Variable must be initialized
        var socket : Socket = IO.socket("http://localhost:3000")
        try {
            socket = IO.socket("http://$ipAddress:3000")
            socket.connect()
        }
        catch (e : URISyntaxException) {
            upperText.text = "Could not connect to the socket"
            upperText.visibility = View.VISIBLE
        }

        downButton.setOnTouchListener { v, event ->
            if(moveBackwardEnable) {
                if (event.action == MotionEvent.ACTION_DOWN)
                    socket.emit("move", "backward")
                else if (event.action == MotionEvent.ACTION_UP)
                    socket.emit("move", "stop")
            }
            true
        }

        upButton.setOnTouchListener { v, event ->
            if(event.action == MotionEvent.ACTION_DOWN)
                socket.emit("move", "forward")
            else if(event.action == MotionEvent.ACTION_UP)
                socket.emit("move", "stop")
            true
        }

        leftButton.setOnTouchListener { v, event ->
            if(event.action == MotionEvent.ACTION_DOWN)
                socket.emit("move", "left")
            else if(event.action == MotionEvent.ACTION_UP)
                socket.emit("move", "stop")
            true
        }

        rightButton.setOnTouchListener { v, event ->
            if(event.action == MotionEvent.ACTION_DOWN)
                socket.emit("move", "right")
            else if(event.action == MotionEvent.ACTION_UP)
                socket.emit("move", "stop")
            true
        }

        cameraUp.setOnTouchListener { v, event ->
            if(event.action == MotionEvent.ACTION_DOWN)
                socket.emit("camera", "up")
            else if(event.action == MotionEvent.ACTION_UP)
                socket.emit("camera", "stop")
            true
        }

        cameraDown.setOnTouchListener { v, event ->
            if(event.action == MotionEvent.ACTION_DOWN)
                socket.emit("camera", "down")
            else if(event.action == MotionEvent.ACTION_UP)
                socket.emit("camera", "stop")
            true
        }

        socket.on("connect") {
            println("Connected to server")
        }

        socket.on("disconnect") {
            println("Disconnected from server")
        }

        socket.on("obstacle", onObstacle)

    }

    private var onObstacle: Emitter.Listener = Emitter.Listener { args ->
        runOnUiThread(Runnable {
            val value = args[0] as Boolean
            if(value){
                warnText.text = "Obstacle alert"
                warnText.visibility = View.VISIBLE
                moveBackwardEnable = false
            }
            else {
                warnText.visibility = View.INVISIBLE
                moveBackwardEnable = true
            }
        })
    }
}
