import React from 'react'
import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children, role }) => {
    const { user } = useSelector(store => store.auth);

    if (!user || (role && role !== user.role)) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute