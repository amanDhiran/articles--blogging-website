import axios from "axios";
import { useEffect, useState } from "react";
import BACKEND_URL from "../config";

export interface User {
    id: string,
    email: string,
    name: string,
    posts: 
        {
            content: string;
            title: string;
            id: string;
            author: {
              name: string
            }
      }[]
    
}

export default function useProfile(){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<User>()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/details`, {
            headers: {
                Authorization: 'bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            setData(res.data.user)
            setLoading(false)
            // console.log(data);
            
        }).catch(err => console.log(err, "there was an error while fetching blogs")
        )
        
    }, [])

    return {
        loading,
        data,
        setData
    }
}