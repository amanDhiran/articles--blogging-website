import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

interface BlogCardProps {
  authorName: string;
  content: string;
  title: string;
  id: string;
  publishedDate: string;
  handleDelete?: (id: string) => Promise<void>;
  fromProfile?: boolean;
}

function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
  handleDelete,
  fromProfile,
}: BlogCardProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="text-secondary  border-b border-slate-400/20   mt-8 p-4">
      <Link to={`/blog/${id}`}>
        <div className="flex gap-2 text-xs items-center">
          <div className="flex items-center gap-1">
            <div className="px-2 py-1 bg-border rounded-[50%]  flex flex-col justify-center">
              {authorName[0].toUpperCase()}
            </div>
            <div className="font-light">{authorName}</div>
          </div>
          <div className="h-1 w-1 bg-slate-500 rounded-full"></div>
          <div className=" text-slate-400/80">{publishedDate}</div>
        </div>
        <div className="mt-3 text-xl lg:text-2xl font-bold">{title}</div>
        <div className=" mt-2 max-h-20  line-clamp-3 text-slate-400/70 lg:text-lg text-base">
          {parse(content)}
        </div>
      </Link>
      <div className="flex justify-between mt-3 items-center">
        <div className="text-xs text-slate-500/50 ">
          {`${Math.ceil(content?.length / 500)} minute(s) read`}
        </div>
        <div className="relative">
          {fromProfile && (
            <button
              onMouseLeave={() => setShow((prev) => !prev)}
              onMouseEnter={() => setShow((prev) => !prev)}
              onClick={() => handleDelete && handleDelete(id)}
              className=" rounded-full "
            >
              <MdDelete className="transition-all  ease-in-out duration-300 text-red-600/85 hover:text-red-600 text-xl" />
            </button>
          )}
          {show && (
            <div
              className={` absolute bottom-full  bg-primary text-secondary text-xs -right-5  border px-2  py-1 rounded  border-slate-800/60 flex  z-10 transition-all ease-in-out duration-300 ${
                show ? " opacity-100 " : "opacity-0 "
              }`}
            >
              Delete
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
