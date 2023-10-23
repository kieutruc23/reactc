import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ element, isAuthenticated, userRole }) => {
    if (!isAuthenticated || userRole !== "admin") {
        return <Navigate to="/signin" />;
    }

    return element;
};

export default ProtectedAdminRoute;

