import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, MapPin, Award, Briefcase } from "lucide-react";
import axiosInstance from "../../api/axios";
import { useShareContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Appointment() {
  const { docId } = useParams();
  const { token } = useShareContext();

  const nav=useNavigate()

  const [doctor, setDoctor] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState({});

  const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  // ================= Fetch Doctor =================
  useEffect(() => {
    const getDoctor = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/admin/get-doctor-byid/${docId}`
        );

        setDoctor(data.doctor);
        setBookedSlots(data.doctor.slots_booked || {});
        setRelatedDoctors(data.relatedDoctors || []);
      } catch (error) {
        toast.error("Failed to load doctor info");
      }
    };

    getDoctor();
  }, [docId]);

  // ================= Generate Slots =================
  const getAvailableSlots = () => {
    const today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      currentDate.setHours(10, 0, 0, 0);

      let timeSlots = [];

      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  useEffect(() => {
    if (doctor) getAvailableSlots();
  }, [doctor]);

  // ================= Booking =================
  const handleBooking = async () => {
    if (!slotTime) return toast.error("Please select time");

    const selectedDate =
      docSlots[slotIndex][0].datetime.toISOString().split("T")[0];

    try {
      const { data } = await axiosInstance.post(
        "/user/book-appointment",
        { doctorId: docId, slotDate: selectedDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Appointment booked successfully 🎉");
        setBookedSlots(data.doctorSlots);
        nav('/my-appointment')
        setSlotTime("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Booking failed");
    }
  };

  if (!doctor)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-500">
          Loading doctor info...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50">

      {/* ================= Doctor Card ================= */}
      <div className="w-[92%] max-w-7xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-3 gap-10 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-10"
        >
          <div className="relative">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="rounded-3xl w-full h-full object-cover"
            />
            <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold shadow
              ${doctor.available
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"}`}>
              {doctor.available ? "Available Now" : "Not Available"}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800">
              {doctor.name}
            </h1>

            <p className="mt-3 text-gray-500 text-lg">
              {doctor.degree} • {doctor.specialty}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div className="flex items-center gap-3">
                <Briefcase className="text-blue-500" />
                <span>{doctor.experience} Years Experience</span>
              </div>

              <div className="flex items-center gap-3">
                <Award className="text-purple-500" />
                <span>{doctor.degree}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-red-500" />
                <span>{doctor.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-600 font-semibold text-lg">
                  ${doctor.fees}
                </span>
                <span>Consultation Fee</span>
              </div>
            </div>

            <p className="mt-8 text-gray-600 leading-relaxed">
              {doctor.about}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ================= Booking Section ================= */}
      <div className="w-[92%] max-w-6xl mx-auto mt-24">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Select Date & Time
        </h2>

        {/* Days */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {docSlots.map((day, index) => (
            <div
              key={index}
              onClick={() => { setSlotIndex(index); setSlotTime(""); }}
              className={`min-w-[100px] cursor-pointer text-center p-5 rounded-2xl transition-all duration-300 shadow-md
              ${slotIndex === index
                ? "bg-gradient-to-r from-blue-600 to-cyan-400 text-white scale-105"
                : "bg-white hover:shadow-lg"}`}
            >
              <p className="font-semibold">
                {daysOfWeek[day[0].datetime.getDay()]}
              </p>
              <p>{day[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-12">
          {docSlots[slotIndex]?.map((slot, index) => {
            const selectedDate =
              docSlots[slotIndex][0].datetime.toISOString().split("T")[0];
            const isBooked =
              bookedSlots[selectedDate]?.includes(slot.time);

            return (
              <button
                key={index}
                disabled={isBooked}
                onClick={() => setSlotTime(slot.time)}
                className={`py-3 rounded-xl border text-sm font-medium transition-all duration-300
                ${isBooked
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : slotTime === slot.time
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-white hover:shadow-md hover:-translate-y-1"}`}
              >
                <Clock className="inline w-4 h-4 mr-1" />
                {slot.time}
              </button>
            );
          })}
        </div>

        {slotTime && (
          <div className="mt-14 text-center">
            <button
              onClick={handleBooking}
              className="px-14 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Confirm Appointment
            </button>
          </div>
        )}
      </div>

      {/* ================= Related Doctors ================= */}
      {relatedDoctors.length > 0 && (
        <div className="w-[92%] max-w-7xl mx-auto mt-32">
          <h2 className="text-3xl font-bold text-center mb-12">
            Related Doctors
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
          {relatedDoctors.map((doc) => (
  <Link key={doc._id} to={`/appointment/${doc._id}`}>
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 text-center group border border-gray-100 hover:border-blue-200">

      {/* Doctor Image */}
      <div className="relative">
        <img
          src={doc.image}
          alt={doc.name}
          className="w-28 h-28 mx-auto rounded-full object-cover ring-4 ring-blue-50 group-hover:scale-105 transition duration-500"
        />

        {/* Availability Badge */}
        <span className="absolute top-0 right-10 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full shadow">
          Available
        </span>
      </div>

      {/* Name */}
      <h3 className="font-bold mt-4 text-gray-800 text-lg group-hover:text-blue-600 transition">
        {doc.name}
      </h3>

      {/* Specialty */}
      <p className="text-sm text-gray-500 mt-1">
        {doc.specialty}
      </p>

      {/* Experience */}
      <p className="text-xs text-gray-400 mt-1">
        {doc.experience} Years Experience
      </p>

      {/* Fees */}
      <p className="text-blue-600 font-semibold mt-2">
        ${doc.fees}
      </p>

      {/* Rating */}
      <div className="flex justify-center items-center gap-1 mt-2 text-yellow-400">
        ⭐⭐⭐⭐⭐
        <span className="text-gray-500 text-sm ml-1">(4.9)</span>
      </div>

      {/* Book Button */}
      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 text-sm">
        Book Appointment
      </button>
    </div>
  </Link>
))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Appointment;