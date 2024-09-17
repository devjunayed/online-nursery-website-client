import React from 'react'
import Navbar from '../Navbar/Navbar'

const Header = () => {
  return (
    <div>
      <div className="text-center uppercase text-3xl my-4">
        🌱🌳 <br />{" "}
        <span className="text-[#60A83B] font-bold font-Logo italic">Gach Lagao</span>
      </div>
      <Navbar />
    </div>
  )
}

export default Header
