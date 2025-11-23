import React, {  } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../Provider/AuthContext';
import Spinner from '../Components/Spinner';

const PrivateRoutes = ({children}) => {
    const {user, userLoading} = useAuth();
    const location = useLocation();
    
    // console.log(location);
    
    if(userLoading){
        return <Spinner></Spinner>;
    }
    
    if(user && user?.email){
        return children;
    }
    
    // Fixed: Pass the intended location in state
    return <Navigate to='/login' state={{ from: location }} replace />;
};

export default PrivateRoutes;