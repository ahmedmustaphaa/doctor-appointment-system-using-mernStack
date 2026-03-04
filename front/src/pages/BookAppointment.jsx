import React from "react";
import { assets } from "../assets/assets_frontend/assets";

function BookAppointment() {
  return (
    <div className="w-[80%]  mx-auto mt-20">
      <div className="relative bg-[#5f6fff] rounded-3xl px-6 sm:px-10 py-14 flex flex-col md:flex-row items-center justify-between overflow-hidden">
        
        {/* Left Content */}
        <div className="text-white max-w-xl text-center md:text-left z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Book Appointment <br />
            With <span className="font-extrabold">100+ Trusted Doctors</span>
          </h1>

          <button className="mt-8 bg-white text-[#5f6fff] px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
            Create account
          </button>
        </div>

        {/* Right Image */}
        <div className=" w-full md:w-auto mt-10 md:mt-0">
          <img
            src={assets.appointment_img}
            alt="Doctor"
            className="
            
              w-56
              sm:w-64
              md:w-72
              lg:w-80
              xl:w-96
              object-contain
              md:absolute
              md:top-[-40px]
              md:right-10
            "
          />
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
