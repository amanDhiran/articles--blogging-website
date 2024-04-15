import React from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";

function Home() {

  return (
    <>
      <Navbar />
      <div className=" lg:mx-28 mx-8 ">
        <BlogCard />
        
      </div>
    </>
  );
}

export default Home;
