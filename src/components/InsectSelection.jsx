import React from 'react'

const InsectSelection = ({ image, name, setIsInsect, setCursorStyle }) => {
    const handleInsectSellection = () => {
        setIsInsect(true)
        setCursorStyle({ cursor: `url(${image}), auto` })
    }
    return (
        <div onClick={handleInsectSellection} className='bg-bgPrimary rounded-xl flex items-center flex-col py-1.5 px-6 cursor-pointer hover:shadow-lg'>
            <img src={image} alt="handPointing" className={`w-[45px]`} />
            <h1 className='text-lg'>{name}</h1>
        </div>
    )
}

export default InsectSelection