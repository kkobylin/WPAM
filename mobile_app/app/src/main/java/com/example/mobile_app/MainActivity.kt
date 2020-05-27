package com.example.mobile_app

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.RadioGroup
import android.widget.ToggleButton
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.AppCompatToggleButton
import kotlinx.android.synthetic.main.welcome_screen.*


class MainActivity : AppCompatActivity() {

    var rafalView = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.welcome_screen)

        val ipAddress: String
        if (intent != null) {
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

//        val toggleListener =
//            RadioGroup.OnCheckedChangeListener { radioGroup, i ->
//                for (j in 0 until radioGroup.childCount) {
//                    val view = radioGroup.getChildAt(j) as ToggleButton
//                    view.isChecked = view.id == i
//                }
//            }
//
//        toggleGroup.setOnCheckedChangeListener(toggleListener);


        nextButton.setOnClickListener { _ ->
            val ip: String = ipEditText.text.toString()
            if (ip.isNotEmpty()) {
                if (ipAddressPattern.matches(ip)) {
                    val robotSteerIntent = if (rafalView) {
                        Intent(applicationContext, RobotSteerActivity::class.java)
                    } else {
                        Intent(applicationContext, RobotSteerActivityRafal::class.java)
                    }
                    robotSteerIntent.putExtra("ip", ip)
                    startActivity(robotSteerIntent)
                } else {
                    ipEditText.text.clear()
                    ipEditText.hint = "Incorrect IP address"
                }
            } else {
                ipEditText.hint = "You must enter IP address";
            }
        }
    }


    fun onToggle(view: View) {
        (view.parent as RadioGroup).check(view.id)
        rafalView = if((view as AppCompatToggleButton).text == "Green") {
            // Green active
            green_button.setBackgroundResource(R.color.colorSecondaryBackgroundRafal)
            green_button.setTextColor(resources.getColor(R.color.colorSecondaryBackgroundPressedRafal))
            // Grey inactive
            grey_button.setBackgroundResource(R.color.colorSecondaryBackground)
            grey_button.setTextColor(resources.getColor(R.color.colorPrimaryBackgroundPressed))
            true
        } else{
            // Green inactive
            green_button.setBackgroundResource(R.color.colorSecondaryBackground)
            green_button.setTextColor(resources.getColor(R.color.colorPrimaryBackgroundPressed))
            // Grey active
            grey_button.setBackgroundResource(R.color.colorPrimaryText)
            grey_button.setTextColor(resources.getColor(R.color.white))
            false
        }
    }
}
