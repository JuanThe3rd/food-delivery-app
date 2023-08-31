import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import RestaurantCard from './RestaurantCard';
import UserNavbar from './UserNavbar';

function Home() {
    const location = useLocation();
    const user_login = location.state[0];
    const cart = location.state[1];
    const restaurant = location.state[2];

    const [restaurants, setRestaurants] = useState();

    useEffect(() => {
        fetch('/restaurants')
            .then(res => res.json())
            .then(setRestaurants)
    }, [])

    return (
        <div>
            <UserNavbar user_login={user_login} cart={cart} restaurant={restaurant} />
            <h1 className='page-title' >Welcome {user_login.user.name}!</h1>

            <div className='restaurants-container' >
                {restaurants?.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} user_login={user_login} cart={cart} />
                ))}
            </div>
        </div>
    );
}

export default Home;