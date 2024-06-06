import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className="navbar bg-bgPrimary p-4">
                <div className="flex justify-between">
                    <h1 className='text-lg'>Logo</h1>
                    <div className="flex justify-between gap-5">
                        <h1 className='text-lg'>Library</h1>
                        <h1 className='text-lg'>Previous</h1>
                        <h1 className='text-lg'>Next</h1>
                        <h1 className='text-lg'>logout</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar