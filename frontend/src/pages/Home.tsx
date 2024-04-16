import React from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import useBlogs from "../hooks/useBlogs";

function Home() {
  const { loading, data } = useBlogs();
  return (
    <>
      <Navbar />
      <div className=" lg:mx-520 mx-8 ">
        {loading ? (
          <p className="text-secondary">loading...</p> //fix loading
        ) : (
          data.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              content={blog.content}
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
