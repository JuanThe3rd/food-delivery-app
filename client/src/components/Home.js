import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RestaurantCard from './RestaurantCard';
import Navbar from './Navbar';

function Home() {
    const location = useLocation();
    const user_login = location.state

    const [restaurants, setRestaurants] = useState();

    useEffect(() => {
        fetch('/restaurants')
            .then(res => res.json())
            .then(setRestaurants)
    }, [])

    return (
        <div>
            <Navbar user_login={user_login} />
            <h1 className='home-title' >Welcome {user_login.user.name}!</h1>

            {restaurants?.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} user_login={user_login} />
            ))}
        </div>
    );
}

export default Home;