import React from 'react'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import { Outlet } from 'react-router-dom'
function Dashboard() {
  return (
   <div className='flex w-full h-screen'>
  <div className='bg-white w-[70px] md:w-[18%] h-full border-r'>
    <Sidebar />
  </div>

  <div className='flex-1 overflow-hidden'>
    <Navbar />
    <div className='overflow-y-auto h-[calc(100vh-64px)] px-2 md:px-8'>
      <Outlet />
    </div>
  </div>
</div>

  )
}

export default Dashboard
