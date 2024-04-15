import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  content: string;
  title: string;
  id: string;
  publishedDate: string;
}

function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  return (
    <Link to={`/blog/:${id}`}>
      <div className="text-secondary cursor-pointer border border-slate-400/20 rounded-lg  mt-4 p-2">
        <div className="flex gap-2 text-xs items-center">
          <div className="flex items-center gap-1">
            <div className="px-2 py-1 bg-border rounded-[50%] flex flex-col justify-center">
              {authorName[0].toUpperCase()}
            </div>
            <div>{authorName}</div>
          </div>
          <div className="h-1 w-1 bg-slate-500 rounded-full"></div>
          <div>{publishedDate}</div>
        </div>
        <div className="mt-2 text-xl lg:text-2xl font-bold">{title}</div>
        <div className="text-slate-400/70 lg:text-lg text-base">
          {content?.length > 200 ? content.slice(0, 200) + "..." : content}
        </div>
        <div className="text-xs text-slate-500/50 mt-3">
          {`${Math.ceil(content?.length / 500)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;