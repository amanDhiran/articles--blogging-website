import React from "react";
import Navbar from "../components/Navbar";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import useProfile from "../hooks/useProfile";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import BACKEND_URL from "../config";

function Profile() {
  const {loading, data, setData} = useProfile()
  async function handleDelete(id: string){
    await axios.delete(`${BACKEND_URL}/blog/${id}`
    , {
      headers: {
          Authorization: 'bearer ' + localStorage.getItem("token")
      }
    })
    setData((prevData: any) => ({
      ...prevData,
      posts: data?.posts.filter(blog => blog.id !== id),
    }))

  }
  return (
    <>
      <Navbar />
      <div className="text-secondary  lg:mx-52 mx-8 mt-14 ">
        <div className=" flex justify-between items-center">
          <div className="flex items-center  gap-3">
            <div className="h-11 w-11 bg-border rounded-[50%]  flex flex-col justify-center items-center text-xl">
              {data?.name[0].toUpperCase()}
            </div>
            <div className="text-2xl font-bold">{data?.name}</div>
          </div>
          <button className=" text-sm bg-secondary text-primary px-2 font-medium h-9 rounded-md hover:bg-hover">
            Edit Profile
          </button>
        </div>
        <div className="border-b mt-10 border-gray-700/50 pb-2">
          <span className="border-b border-secondary pb-2 px-">
            Published Blogs
          </span>
        </div>
        
        {loading ? <div className="mt-10">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div> : data?.posts.length === 0 ? <div className="text-slate-700/40 text-center mt-20 text-3xl font-bold">You have not posted any blog.</div> : data?.posts.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              content={blog?.content}
              title={blog.title}
              publishedDate={"15th, April 2024"}
              key={blog.id}
              handleDelete= {handleDelete}
              fromProfile ={ true}
            />
          ))}
      </div>
    </>
  );
}

export default Profile;
