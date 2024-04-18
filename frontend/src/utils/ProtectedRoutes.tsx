import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute () {
    const token = localStorage.getItem("token")
    
    
    if(!token){
        return <Navigate to="/signin" />
    }
    return <Outlet />
} 

export default ProtectedRoute;