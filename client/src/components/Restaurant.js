import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import UserNavbar from './UserNavbar'

function Restaurant() {
    const location = useLocation();
    const data = location.state;
    const restaurant = data.restaurant;
    const user_login = data.user_login;

    const [items, setItems] = useState();

    useEffect(() => {
        fetch('/menuItems')
            .then(res => res.json())
            .then(menuItems => setItems(menuItems.filter(item => item.restaurant.id === restaurant.id)))
    }, [])

    return (
        <div>
            <UserNavbar user_login={user_login} />
            <h1>{restaurant.name}</h1>

            {items?.map(item => (
                <div key={item.id} >
                    <img src={item.image} />
                </div>
            ))}
        </div>
    );
}

export default Restaurant;
