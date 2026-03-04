import React, { useEffect, useState } from "react";
import { Home, CalendarCheck, User, X } from "lucide-react";
import axiosInstance from "../pai/axios";

function DashboardPage() {
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  // جلب البيانات من السيرفر
  const getDashData = async () => {
    try {
      const { data } = await axiosInstance.get('/adminRoute/dashboard-data');
       console.log(data)
      
      if (data.success) {
        setDashData(data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-bold text-blue-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  // مصفوفة الكروت العلوية بناءً على أرقام الـ API
  const statsCards = [
    {
      name: "Doctors",
      value: dashData?.doctor|| 0,
      icon: <Home size={20} />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      name: "Appointments",
      value: dashData?.appointment || 0,
      icon: <CalendarCheck size={20} />,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      name: "Patients",
      value: dashData?.user || 0,
      icon: <User size={20} />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card, idx) => (
          <div 
            key={idx} 
            className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#F4B944]'} p-6 rounded-2xl shadow-sm flex items-center gap-5 border border-gray-100`}
          >
            <div className={`${card.bg} ${card.color} p-4 rounded-xl flex items-center justify-center`}>
              {card.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-gray-500 text-sm font-medium">{card.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Appointments Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <CalendarCheck size={20} className="text-blue-500" />
          <h3 className="text-gray-800 font-bold">Latest Appointments</h3>
        </div>

        <div className="p-4">
          <ul className="divide-y divide-gray-100">
            {dashData?.latestAppointment?.map((item, index) => (
              <li key={item._id || index} className="flex items-center justify-between py-4 hover:bg-gray-50 px-3 rounded-xl transition-all">
                <div className="flex items-center gap-4">
                  {/* صورة الطبيب (لو موجودة في الـ docData) */}
                  <img 
                    src={item.doctorData?.image || "https://via.placeholder.com/100"} 
                    alt="doctor" 
                    className="w-12 h-12 rounded-full object-cover bg-blue-50" 
                  />
                  <div>
                    <p className="font-bold text-gray-900">{item.docData?.name || "Doctor"}</p>
                    <p className="text-gray-600 text-sm">
                      Patient: <span className="font-semibold text-blue-600">{item.userData?.name}</span>
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {item.slotDate} | <span className="text-gray-500 font-medium">{item.slotTime}</span>
                    </p>
                  </div>
                </div>
                
                <button 
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                  title="Cancel Appointment"
                >
                  <X size={20} />
                </button>
              </li>
            ))}

            {(!dashData?.latestAppointments || dashData.latestAppointments.length === 0) && (
              <div className="text-center py-12 text-gray-400">
                No recent appointments found.
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;