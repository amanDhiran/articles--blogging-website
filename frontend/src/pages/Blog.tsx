import React from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import useBlog from "../hooks/useBlog";
import parse from 'html-react-parser'
import BlogPostSkeleton from "../components/BlogPostSkeleton";

function Blog() {
  const {id} = useParams()

  const {loading, blog} = useBlog({id: id || ""})
  return (
    <>
      <Navbar />
      <div className="text-secondary lg:mx-24 mx-8 mt-5 ">
        <Link to="/home">
          <p className=" flex items-center gap-2 font-light text-slate-200/70 hover:text-secondary">
            <IoIosArrowRoundBack /> Go back
          </p>
        </Link>
        {loading ? <>
        <BlogPostSkeleton/>
        </> : 
          <div className="mt-5 flex flex-col gap-3 lg:max-w-[1100px]">
          <div className="text-5xl font-bold">
            {blog?.title}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-800/80 rounded-[50%]  flex flex-col justify-center items-center text-sm">
              {blog?.author.name[0].toUpperCase()}
            </div>
            <div className="font-light">{blog?.author.name}</div>
          </div>
          <div className="flex gap-3 items-center text-sm md:text-base text-slate-200/50">
            <div>January 9, 2023</div>
            <div className="h-1 w-1 rounded-full bg-slate-500/60"></div>
            <div>{`${Math.ceil(blog?.content.length / 500)} minute(s) read`}</div>
          </div>
          <div className="leading-7">
            {parse(blog?.content)}
          </div>
        </div>
        }
        
      </div>
    </>
  );
}

export default Blog;
