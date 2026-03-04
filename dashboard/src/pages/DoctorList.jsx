import React, { useEffect, useState } from "react";
import axiosInstance from "../pai/axios";
import Cookies from "universal-cookie";

function DoctorList() {
  const [doctorsList, setDoctorsList] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/getDoctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data)
        setDoctorsList(data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
      }
    };

    fetchDoctors();
  }, []);

  const toggleAvailability = async (id) => {

    try{

      console.log(id)

      await axiosInstance.post('/adminRoute/change-available',{id});    
      
      setDoctorsList((prev)=>{
        return prev.map((doc)=>(
          doc._id ==id ?{...doc , available:!doc.available}:doc
        ))
      })
      
    }catch(error){    
        console.error("Error changing availability:", error.message);
    } 
 

  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Doctors Management
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {doctorsList.map((doc) => (
          <div
            key={doc._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-48 object-cover"
              />

              {/* Availability Badge */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                  doc.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doc.available ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-800">
                  {doc.name}
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  {doc.specialty}
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                <p><span className="font-semibold">Degree:</span> {doc.degree}</p>
                <p><span className="font-semibold">Experience:</span> {doc.experience} yrs</p>
                <p><span className="font-semibold">Fees:</span> ${doc.fees}</p>
                <p><span className="font-semibold">Email:</span> Admin</p>
              </div>

              {/* About */}
              <p className="text-xs text-gray-500 line-clamp-2">
                {doc.about || "No description provided."}
              </p>

              {/* Availability Checkbox */}
              <div className="flex items-center justify-between pt-4 border-t">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={doc.available}
                    onChange={() => toggleAvailability(doc._id)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                  Available
                </label>

                <button className="text-sm text-blue-600 hover:underline">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;