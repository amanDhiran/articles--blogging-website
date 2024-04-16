import React from 'react'

function BlogCardSkeleton() {
  return (
    <>
      <div className=" animate-pulse border border-gray-700 rounded-lg mt-4 p-4">
            <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1">
                    <div className="px-2 py-2 bg-gray-700 bg-border rounded-[50%] h-3 flex flex-col justify-center"></div>
                    <div className="font-light bg-gray-700 rounded-full h-3 w-14"></div>
                </div>
                <div className="h-1 w-1 bg-gray-700 rounded-full"></div>
                <div className="bg-gray-700  rounded-full h-3 w-14"></div>
            </div>
            <div className="mt-2 h-7 mb-2 lg:h-14 rounded-full bg-gray-700 w-96 "></div>
            <div className=" mt-2 rounded-full bg-gray-700 lg:h-4 h-4 w-full"></div>
            <div className="mt-2 rounded-full bg-gray-700 lg:h-4 h-4 w-full"></div>
            <div className="h-3 rounded-full w-9 bg-gray-700 mt-3"></div>
      </div>
    </>
  );
}

export default BlogCardSkeleton