import React, { useEffect, useState } from "react";
import axiosInstance from "../pai/axios";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { motion } from "framer-motion";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllAppointments = async () => {
    try {
      const { data } = await axiosInstance.get("/adminRoute/get-appointment");
      if (data.success) setAppointments(data.appointments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  const columns = [
    {
      header: "Patient",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            {row.original.userData?.name?.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 text-sm">{row.original.userData?.name}</span>
            <span className="text-[11px] text-gray-400">{row.original.userData?.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Doctor",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={row.original.doctorData?.image} className="w-10 h-10 rounded-xl object-cover" />
          <span className="font-medium text-gray-700 text-sm">{row.original.doctorData?.name}</span>
        </div>
      ),
    },
    {
      header: "Fees",
      cell: ({ row }) => <span className="font-black text-gray-900">${row.original.amount}</span>,
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black ${
            row.original.payment ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
          }`}
        >
          {row.original.payment ? "Paid" : "Unpaid"}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: appointments,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading)
    return <div className="p-20 text-center text-gray-600 font-medium">Loading appointments...</div>;

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-gray-100 via-white to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-[32px] shadow-xl overflow-hidden">
        {/* Scrollable wrapper for mobile */}
        <div className="overflow-x-auto">
          <table className="min-w-[600px] md:min-w-full w-full text-left">
            <thead className="bg-gray-50 uppercase text-[11px] font-black text-gray-400">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th key={h.id} className="px-6 py-4">
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-all"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {appointments.length === 0 && (
          <div className="p-12 text-center text-gray-500 font-medium">No appointments found.</div>
        )}
      </div>
    </div>
  );
};

export default Appointments;