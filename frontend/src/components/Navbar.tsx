import React, { useState } from 'react'
import { LuPenSquare } from "react-icons/lu";
import { Link } from 'react-router-dom';

function Navbar({handleClick, fromCreatePage}: {handleClick?: () => void, fromCreatePage?: boolean}) {
  const [show, setShow] =useState(false)
  return (
    <div className='border-b border-gray-700/20 px-4 py-3 relative md:py-5'>
        <div className='text-secondary flex justify-between  items-center lg:mx-16 mx-8 '> 
            <Link to={'/'} className=' text-3xl font-bold'>
                Articles
            </Link>
            <div className='flex items-center  gap-4'>
                  {fromCreatePage ? <button className='bg-green-600 rounded-md p-2' onClick={handleClick}>Publish</button> : <Link to={'/new-blog'} className='flex font-light text-slate-200/70 hover:text-secondary items-center gap-2'><LuPenSquare className='text-xl' />Write</Link>
                  }
                {/* <p className='lg:text-lg'>Hello, User</p> */}
                <div onClick={() => setShow((prev) => !prev) } className="px-4 py-2 bg-border rounded-[50%] flex flex-col justify-center hover:cursor-pointer">U</div>
            </div>
        </div>
        {show && <div className={` absolute -bottom-20 bg-primary text-secondary right-[1px] lg:right-16 border px-5  py-3 rounded  border-slate-800/60 w-52 lg:w-60 flex flex-col z-10 gap-2 transition-all ease-in-out duration-300 ${show ? " opacity-100 " : "opacity-0 "}`}>
          <Link to={'/profile'} className='transition-all ease-in-out duration-300 text-slate-200/70 hover:text-secondary'>Profile</Link>
          <Link to={'/profile'} className='transition-all ease-in-out duration-300 text-red-600/85 hover:text-red-600'>Log Out</Link>
        </div>}
    </div>
  )
}

export default Navbar