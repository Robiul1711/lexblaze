import React from 'react'
import rightImg from "@/assets/images/rightSideImg.png"
const RightSide = () => {
  return (
    <div>
      <button className='bg-[#D40000] py-3 w-full mb-3 rounded-xl font-bold text-xl text-white'>EVENTOS DESTACADOS</button>
        <img src={rightImg} alt="" />
    </div>
  )
}

export default RightSide