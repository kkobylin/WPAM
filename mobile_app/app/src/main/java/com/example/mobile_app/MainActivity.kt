package com.example.mobile_app

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.github.nkzawa.emitter.Emitter
import com.github.nkzawa.socketio.client.IO
import com.github.nkzawa.socketio.client.Socket
import kotlinx.android.synthetic.main.activity_main.*
import java.net.URISyntaxException

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.robot_steer_layout)
        //upperText.visibility = View.INVISIBLE

        //Variable must be initialized
//        var socket : Socket = IO.socket("http://localhost:3080")
//        try {
//            socket = IO.socket("http://192.168.88.52:3080")
//        }
//        catch (e : URISyntaxException) {
//            upperText.text = "Could not connect to the socket"
//            upperText.visibility = View.VISIBLE
//        }
//
//        button.setOnClickListener { v ->
//
//            socket.connect()
//            socket.emit("connected", "forward")
//        }
//
//        socket.on("connect") {
//            println("Connected to server")
//        }
//
//        socket.on("disconnect") {
//            println("Disconnected from server")
//        }
//
//        socket.on("obstacle", onObstacle)

    }

    private var onObstacle: Emitter.Listener = Emitter.Listener { args ->
        runOnUiThread(Runnable {
            val value = args[0] as Boolean
            if(value){
                upperText.text = "Obstacle alert"
                upperText.visibility = View.VISIBLE
            }
            else
                upperText.visibility = View.INVISIBLE
        })
    }
}
