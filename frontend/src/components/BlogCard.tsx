

import parse from "html-react-parser";
import { Link } from "react-router-dom";


interface BlogCardProps {
  authorName: string;
  content: string;
  title: string;
  id: string;
  publishedDate: string;
  handleDelete: (id: string) => Promise<void>
}

function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
  handleDelete
}: BlogCardProps) {

  return (
    
      <div className="text-secondary  border border-slate-400/20 rounded-lg  mt-4 p-4">
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
        <div className="font-light mt-2 max-h-20  line-clamp-3 text-slate-400/70 lg:text-lg text-base">
          {/* {content?.length > 200 ? parse(content) + "..." :  */}
          {parse(content)}
           {/* } */}
        </div>
        </Link>
        <div className="flex justify-between">
        <div className="text-xs text-slate-500/50 mt-3">
          {`${Math.ceil(content?.length / 500)} minute(s) read`}
        </div>
        <button  onClick={() => handleDelete(id)} className="rounded-full px-2 py-2 bg-red-600">Delete</button>
        </div>
      </div>
    
  );
}

export default BlogCard;
