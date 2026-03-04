import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctors } from "../assets/assets_frontend/assets";
import { useShareContext } from "../context/AppContext";

function Doctors() {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const {doctorlist,setdoctorlist}=useShareContext();
  const specialities = [...new Set(doctors.map((doc) => doc.speciality))];
  console.log(doctorlist)
  const filteredDoctors = speciality
    ? doctorlist.filter((doc) => doc.specialty === speciality)
    : doctorlist;
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-10">

        {/* Sidebar */}
        <aside className="w-full lg:w-72">
          <div className="bg-white rounded-3xl p-6 shadow-md sticky top-6">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Specialities
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/doctors")}
                className={`text-left px-5 py-3 rounded-xl text-sm font-medium transition
                  ${!speciality
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                All Doctors
              </button>
              {specialities.map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(`/doctors/${item}`)}
                  className={`text-left px-5 py-3 rounded-xl text-sm font-medium transition
                    ${speciality === item
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                      : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {speciality || "All Doctors"}
            </h1>
            <p className="text-gray-500 mt-2">
              Professional doctors ready for your appointment
            </p>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 flex justify-center pt-8 pb-4">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {doc.name}
                  </h2>

                  <p className="text-sm text-indigo-600 mt-1 font-medium">
                    {doc.speciality}
                  </p>

                  <div className="flex justify-center gap-4 text-sm text-gray-500 mt-4">
                    <span>{doc.experience}</span>
                    <span>•</span>
                    <span>${doc.fees}</span>
                  </div>

                  <button
                    className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:from-blue-600 hover:to-indigo-600 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <p className="text-center text-gray-500 mt-12 text-lg">
              No doctors found for this speciality
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Doctors;
