import React, { useState } from "react";
import { useEditor } from "@tiptap/react";
import Navbar from "../components/Navbar";
import TextEditor from "../components/TextEditor";
import CodeBlock from "@tiptap/extension-code-block";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { CreateBlogInput } from "@aman.dev/common";
import axios from "axios";
import BACKEND_URL from "../config";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [blogData, setBlogData] = useState<CreateBlogInput>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
      CodeBlock,
    ],

    editorProps: {
      attributes: {
        class: " focus:outline-none h-20",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setBlogData({
        ...blogData,
        content: html,
      });
    },
  });

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await axios.post(`${BACKEND_URL}/blog`, blogData, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      });  
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
    
    navigate("/");
  };

  return (
    <>
      <Navbar loading={loading} handleClick={handleSubmit} fromCreatePage={true} />
      <div className="text-secondary lg:mx-24 mx-8 mt-5 ">
        <div className="mt-5 flex flex-col gap-3 lg:max-w-[1100px]">
          <div className="md:text-5xl text-3xl font-bold">
            <input
              type="text"
              className="w-full outline-none bg-primary"
              placeholder="Title"
              onChange={(e) =>
                setBlogData({
                  ...blogData,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className="leading-7 editorJs text-secondary">
            <TextEditor editor={editor} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBlog;
