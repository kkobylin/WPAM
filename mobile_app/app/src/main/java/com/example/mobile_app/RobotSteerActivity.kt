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
                "No IP"
        } else
            "No IP"

        warnText.visibility = View.INVISIBLE
        redLine.visibility = View.INVISIBLE

        webView.loadUrl("http://$ipAddress:3080")
        webView.setPadding(0, 0, 0, 0)
        webView.setInitialScale(getScale())
        webView.settings.builtInZoomControls = true;

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
                if (event.action == MotionEvent.ACTION_DOWN) {
                    socket.emit("move", "backward")
                    dpadOuter.setBackgroundResource(R.drawable.dpad_outer_down_pressed)
                }
                else if (event.action == MotionEvent.ACTION_UP) {
                    socket.emit("move", "stop")
                    dpadOuter.setBackgroundResource(R.drawable.dpad_outer)
                }
            }
            true
        }

        upButton.setOnTouchListener { v, event ->
            if(event.action == MotionEvent.ACTION_DOWN) {
                socket.emit("move", "forward")
                dpadOuter.setBackgroundResource(R.drawable.dpad_outer_up_pressed)
            }
            else if(event.action == MotionEvent.ACTION_UP) {
                socket.emit("move", "stop")
                dpadOuter.setBackgroundResource(R.drawable.dpad_outer)
            }
            true
        }

        leftButton.setOnTouchListener { v, event ->
            if(event.action == MotionEvent.ACTION_DOWN) {
                socket.emit("move", "left")
                dpadOuter.setBackgroundResource(R.drawable.dpad_outer_left_pressed)
            }
            else if(event.action == MotionEvent.ACTION_UP) {
                socket.emit("move", "stop")
                dpadOuter.setBackgroundResource(R.drawable.dpad_outer)
            }
            true
        }

        rightButton.setOnTouchListener { v, event ->
            if(event.action == MotionEvent.ACTION_DOWN) {
                socket.emit("move", "right")
                dpadOuter.setBackgroundResource(R.drawable.dpad_outer_right_pressed)
            }
            else if(event.action == MotionEvent.ACTION_UP) {
                socket.emit("move", "stop")
                dpadOuter.setBackgroundResource(R.drawable.dpad_outer)
            }
            true
        }

        cameraUp.setOnTouchListener { v, event ->
            if(event.action == MotionEvent.ACTION_DOWN) {
                socket.emit("camera", "up")
                cameraUp.setBackgroundResource(R.drawable.camera_background_pressed)
            }
            else if(event.action == MotionEvent.ACTION_UP) {
                socket.emit("camera", "stop")
                cameraUp.setBackgroundResource(R.drawable.camera_background_released)
            }
            true
        }

        cameraDown.setOnTouchListener { v, event ->
            if(event.action == MotionEvent.ACTION_DOWN) {
                socket.emit("camera", "down")
                cameraDown.setBackgroundResource(R.drawable.camera_background_pressed)
            }
            else if(event.action == MotionEvent.ACTION_UP) {
                socket.emit("camera", "stop")
                cameraDown.setBackgroundResource(R.drawable.camera_background_released)
            }
            true
        }

        socket.on("connect") {
            println("Connected to server")
        }

        socket.on("disconnect") {
            println("Disconnected from server")
        }

        socket.on("obstacle", onObstacle)

        backButton.setOnClickListener { _ ->
            val mainIntent = Intent(applicationContext, MainActivity::class.java )
            mainIntent.putExtra("ip", ipAddress)
            startActivity(mainIntent)
        }

    }

    private var onObstacle: Emitter.Listener = Emitter.Listener { args ->
        runOnUiThread(Runnable {
            val value = args[0] as Boolean
            if(value){
                redLine.visibility = View.VISIBLE
                downButton.setBackgroundResource(R.drawable.red_chevron_down)
                moveBackwardEnable = false
            }
            else {
                redLine.visibility = View.INVISIBLE
                downButton.setBackgroundResource(R.drawable.chevron_down)
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
