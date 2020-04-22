package com.example.mobile_app

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.content.pm.ActivityInfo
import android.os.Bundle
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import com.github.nkzawa.emitter.Emitter
import com.github.nkzawa.socketio.client.IO
import com.github.nkzawa.socketio.client.Socket
import kotlinx.android.synthetic.main.robot_steer_one.*
import java.net.URISyntaxException


class RobotSteerActivity : AppCompatActivity() {

    var moveBackwardEnable = true

    @SuppressLint("SourceLockedOrientationActivity")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.robot_steer_one)

        /* 192.168.88.52 */
        val ipAddress: String = if(intent != null) {
            if (intent.hasExtra("ip"))
                intent.extras?.getString("ip").toString()
            else
                "No extra"
        } else
            "No extra"

        warnText.visibility = View.INVISIBLE

        webView.loadUrl("http://$ipAddress:3080")
        webView.setPadding(0, 0, 0, 0)
        webView.setInitialScale(getScale())

        //Variable must be initialized
        var socket : Socket = IO.socket("http://localhost:3000")
        try {
            socket = IO.socket("http://$ipAddress:3000")
            socket.connect()
        }
        catch (e : URISyntaxException) {
            warnText.text = "Could not connect to the socket"
            warnText.visibility = View.VISIBLE
        }

        requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE;
        hideSystemUI()

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

        //todo send back settings
        backButton.setOnClickListener { _ ->
            val mainIntent = Intent(applicationContext, MainActivity::class.java )
            startActivity(mainIntent)
        }

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

    private fun hideSystemUI() {
        window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_FULLSCREEN
                or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY)
    }

    private fun getScale(): Int {
        val display =
            (getSystemService(Context.WINDOW_SERVICE) as WindowManager).defaultDisplay
        val width = display.width
//        var value: Double = width / 128.0
        var value: Double = width / 640.0
        value *= 60
        return value.toInt()
    }
}
