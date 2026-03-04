import React from 'react'
import { assets } from '../../../front/src/assets/assets_admin/assets'
function Navbar() {

  return (
    <div className=' py-4 bg-[#F7F7F7] flex justify-between items-center  m-auto rounded-md px-4 '>
        <img src={assets.admin_logo} className='w-30 md:w-36' alt="logo-image" />
        <button className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300'>Logout</button>
      
    </div>
  )
}

export default Navbar
