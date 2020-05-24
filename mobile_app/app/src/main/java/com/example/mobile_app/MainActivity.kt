package com.example.mobile_app

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.welcome_screen.*


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.welcome_screen)

        val ipAddress : String
        if(intent != null) {
            if (intent.hasExtra("ip")) {
                ipAddress = intent.extras?.getString("ip").toString()
                ipEditText.setText(ipAddress)
            }
        }

        val ipAddressPattern =
            ("^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\." +
                    "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\." +
                    "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\." +
                    "([01]?\\d\\d?|2[0-4]\\d|25[0-5])$").toRegex()

        nextButton.setOnClickListener { _ ->
            val ip : String = ipEditText.text.toString()
            if(ip.isNotEmpty()){
                if (ipAddressPattern.matches(ip)) {
                    val robotSteerIntent =
                        Intent(applicationContext, RobotSteerActivity::class.java)
                    robotSteerIntent.putExtra("ip", ip)
                    startActivity(robotSteerIntent)
                }
                else{
                    ipEditText.text.clear()
                    ipEditText.hint = "Incorrect IP address"
                }

            }
            else{
                ipEditText.hint = "You must enter IP address";
            }
        }
    }
}
