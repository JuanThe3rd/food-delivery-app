import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './Navbar'

function Account() {
    const location = useLocation();
    const user_login = location.state;

    return (
        <div>
            <Navbar user_login={user_login} />
            <h1>Account Page</h1>
        </div>
    )
}

export default Account;