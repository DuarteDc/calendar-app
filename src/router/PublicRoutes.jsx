import { useSelector } from "react-redux";

import { Navigate } from "react-router"



const PublicRoutes = ({ children, isAuthenticated }) => {

  return isAuthenticated
    ? children
    : <Navigate to="/" />
}

export default PublicRoutes