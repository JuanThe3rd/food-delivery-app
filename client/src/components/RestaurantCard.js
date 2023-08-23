import React from 'react';
import { useHistory } from "react-router-dom";

function RestaurantCard({ restaurant, user_login }){
    const history = useHistory();

    return (
        <div onClick={handleClick} className='restaurant-card' >
            <h2>{restaurant.name}</h2>
            <img alt={`${restaurant.name}_img`} src={restaurant.image} className='restaurant-card-img' />
        </div>
    )

    function handleClick(){
        history.push({
            pathname: '/restaurant',
            state: {
                restaurant: restaurant,
                user_login: user_login
            }
        })
    }
}

export default RestaurantCard;