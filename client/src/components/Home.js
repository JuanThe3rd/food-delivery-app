import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
    const location = useLocation();
    const user_login = location.state

    useEffect(() => {
        console.log(user_login)
    }, [])

    return (
        <div>
            <h1>Welcome {user_login.user.name}!</h1>
        </div>
    );
}

export default Home;