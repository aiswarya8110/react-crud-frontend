import React from "react";
import { useRouteError } from 'react-router-dom';
const ErrorPage = ()=>{
    console.log(useRouteError()); 
    return (
        <h2>Error occcured !!</h2>
    )
}

export default ErrorPage;