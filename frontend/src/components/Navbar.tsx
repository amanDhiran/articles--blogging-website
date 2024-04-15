import React from 'react'

function Navbar() {
  return (
    <div className='border-b border-gray-600/35 p-3'>
        <div className='text-secondary flex justify-between lg:mx-16 mx-8 '> 
            <div className=' text-2xl font-bold'>
                Articles
            </div>
            <div className='flex items-center gap-4'>
                <p className='lg:text-lg'>Hello, User</p>
                <div className="px-4 py-2 bg-border rounded-[50%] flex flex-col justify-center">U</div>
            </div>
        </div>
    </div>
  )
}

export default Navbar