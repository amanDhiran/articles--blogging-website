import React from 'react'

function BlogPostSkeleton() {
  return (
    <div>

        <div className="mt-5 flex flex-col gap-3 animate-pulse lg:max-w-[1100px]">
          <div className="h-14 bg-gray-700 w-full rounded-full font-bold">
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-700 rounded-[50%]  flex flex-col justify-center items-center ">
            </div>
            <div className=" w-20 h-4 bg-gray-700 rounded-full">
            
            </div>
          </div>
          <div className="flex gap-3 items-center ">
            <div className='h-3 w-20 bg-gray-700 rounded-full'></div>
            <div className="h-1 w-1 rounded-full bg-slate-500/60"></div>
            <div className='h-3 w-20 bg-gray-700 rounded-full'>
                
            </div>
          </div>
          <div className="h-6 w-full bg-gray-700 rounded-full"></div>
          <div className="h-6 w-[90%] bg-gray-700 rounded-full"></div>
          <div className="h-6 w-full bg-gray-700 rounded-full"></div>
          <div className="h-6 w-full bg-gray-700 rounded-full"></div>
          <div className="h-6 w-[70%] bg-gray-700 rounded-full"></div>
          <div className="h-6 w-full bg-gray-700 rounded-full"></div>
          <div className="h-6 w-full bg-gray-700 rounded-full"></div>
          <div className="h-6 w-full bg-gray-700 rounded-full"></div>
          <div className="h-6 w-full bg-gray-700 rounded-full"></div>
          <div className="h-6 w-[50%] bg-gray-700 rounded-full"></div>
          <div className="h-6 w-full bg-gray-700 rounded-full"></div>
          <div className="h-6 w-[70%] bg-gray-700 rounded-full"></div>
          <div className="h-6 w-full bg-gray-700 rounded-full"></div>
          <div className="h-6 w-full bg-gray-700 rounded-full"></div>
          <div className="h-6 w-full bg-gray-700 rounded-full"></div>
        </div>
    </div>
  )
}

export default BlogPostSkeleton




