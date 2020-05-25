package com.example.mobile_app

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup


class RobotSteerFragment : Fragment() {

    companion object {
        fun newInstance() = RobotSteerFragment()
    }

    private lateinit var viewModel: RobotSteerViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.robot_steer_fragment, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(RobotSteerViewModel::class.java)
        // TODO: Use the ViewModel
    }

}
