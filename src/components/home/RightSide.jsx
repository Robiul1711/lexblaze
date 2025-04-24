import React from 'react'
import rightImg from "@/assets/images/rightSideImg.png"
const RightSide = () => {
  return (
    <div className='max-w-[400px] mx-auto  lg:w-auto'>
      <button className='bg-[#D40000] py-3 w-full mb-3 rounded-md lg:rounded-xl font-bold xlg:text-xl text-white'>EVENTOS DESTACADOS</button>
        <img src={rightImg} alt="" className='rounded-md w-full' />
    </div>
  )
}

export default RightSide