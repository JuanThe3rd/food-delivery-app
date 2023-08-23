import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './Navbar'

function Restaurant() {
    const location = useLocation();
    const data = location.state;
    const restaurant = data.restaurant;
    const user_login = data.user_login;

    return (
        <div>
            <Navbar user_login={user_login} />
            <h1>{restaurant.name}</h1>
        </div>
    );
}

export default Restaurant;
