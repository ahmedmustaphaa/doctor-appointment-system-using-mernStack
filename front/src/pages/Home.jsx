import React from 'react'
import Header from './Header'
import Menuspecialist from './Menuspecialist'
import TopDoctors from './TopDoctors'
import BookAppointment from './BookAppointment'

function Home() {
  return (
    <div className=''>
      <Header/>
      <Menuspecialist/>
      <TopDoctors/>
      <BookAppointment/>
    </div>
  )
}

export default Home
