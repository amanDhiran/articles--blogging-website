import React from "react";
import Navbar from "../components/Navbar";
import BlogCardSkeleton from "../components/BlogCardSkeleton";

function Profile() {
  return (
    <>
      <Navbar />
      <div className="text-secondary  lg:mx-52 mx-8 mt-8 ">
        <div className=" flex justify-between items-center">
          <div className="flex items-center  gap-3">
            <div className="h-11 w-11 bg-border rounded-[50%]  flex flex-col justify-center items-center text-xl">
              U
            </div>
            <div className="text-2xl font-bold">User</div>
          </div>
          <button className=" text-sm bg-secondary text-primary px-2 font-medium h-9 rounded-md hover:bg-hover">
            Edit Profile
          </button>
        </div>
        <div className="border-b mt-8 border-gray-700/50 pb-2">
          <span className="border-b border-secondary pb-2 px-">
            Published Blogs
          </span>
        </div>
        <div className="mt-8">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      </div>
    </>
  );
}

export default Profile;
