import React from 'react'
import { LuPenSquare } from "react-icons/lu";
import { Link } from 'react-router-dom';

function Navbar({handleClick, fromCreatePage}: {handleClick?: () => void, fromCreatePage?: boolean}) {
  return (
    <div className='border-b border-gray-700/20 px-4 py-3 md:py-5'>
        <div className='text-secondary flex justify-between items-center lg:mx-16 mx-8 '> 
            <Link to={'/home'} className=' text-3xl font-bold'>
                Articles
            </Link>
            <div className='flex items-center gap-4'>
                  {fromCreatePage ? <button className='bg-green-600 rounded-md p-2' onClick={handleClick}>Publish</button> : <Link to={'/new-blog'} className='flex font-light text-slate-200/70 hover:text-secondary items-center gap-2'><LuPenSquare className='text-xl' />Write</Link>
                  }
                {/* <p className='lg:text-lg'>Hello, User</p> */}
                <div className="px-4 py-2 bg-border rounded-[50%] flex flex-col justify-center">U</div>
            </div>
        </div>
    </div>
  )
}

export default Navbar