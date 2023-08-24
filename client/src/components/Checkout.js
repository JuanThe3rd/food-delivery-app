import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import UserNavbar from './UserNavbar';

function Checkout() {
    const location = useLocation();
    const user_login = location.state;

    return (
        <div>
            <UserNavbar user_login={user_login} />
            <h1>Checkout Page</h1>
        </div>
    );
}

export default Checkout;