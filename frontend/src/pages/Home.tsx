import React from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import useBlogs from "../hooks/useBlogs";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import axios from "axios";
import BACKEND_URL from "../config";

function Home() {
  const { loading, data, setData } = useBlogs();

  async function handleDelete(id: string){
    await axios.delete(`${BACKEND_URL}/blog/${id}`
    , {
      headers: {
          Authorization: 'bearer ' + localStorage.getItem("token")
      }
    })
    setData(data.filter(blog => blog.id !== id))
  }

  return (
    <>
      <Navbar />
      <div className=" lg:mx-52 mx-8 ">
        {loading ? (<>
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          </>
        ) : (
          data.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              content={blog?.content}
              title={blog.title}
              publishedDate={"15th, April 2024"}
              key={blog.id}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Home;
