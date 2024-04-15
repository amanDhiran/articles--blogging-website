import axios from "axios";
import { useEffect, useState } from "react";
import BACKEND_URL from "../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export default function useBlog({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>({
    content: "",
    title: "",
    id: "",
    author: {
      name: "",
    },
  });

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/blog/${id}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) =>
        console.log(err, "there was an error while fetching blogs")
      );
  }, []);

  return {
    loading,
    blog,
  };
}
