import axios from "axios";
import { useEffect, useState } from "react";
import BACKEND_URL from "../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string
  }
}

export default function useBlogs(){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<Blog[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/bulk`, {
            headers: {
                Authorization: `bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setData(res.data.posts)
            setLoading(false)
        }).catch(err => console.log(err, "there was an error while fetching blogs")
        )
        
    }, [])

    return {
        loading,
        data
    }
}