import { useSelector } from 'react-redux';

import { Navigate } from 'react-router'


const PrivateRoutes = ({ children, isAuthenticated }) => {

  return isAuthenticated
    ? children
    : <Navigate to="/login" />

}

export default PrivateRoutes