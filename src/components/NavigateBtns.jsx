import React from 'react'
import handPointing from '../assets/svgs/handPointing.svg'

const NavigateBtns = ({ text }) => {
    return (
        <div className='bg-bgPrimary rounded-xl flex items-center flex-col gap- py-1.5 px-5 cursor-pointer hover:shadow-lg mb-4'>
            <img src={handPointing} alt="handPointing" className={`w-[45px] ${text === "Back" ? "" : "-scale-x-100"}`} />
            <h1 className='text-lg'>{text}</h1>
        </div>
    )
}

export default NavigateBtns