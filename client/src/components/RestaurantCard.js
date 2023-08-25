import React from 'react';
import { useHistory } from "react-router-dom";

function RestaurantCard({ restaurant, user_login, cart }){
    const history = useHistory();

    return (
        <div className='restaurant-card' >
            <h2>{restaurant.name}</h2>
            <img onClick={handleClick} alt={`${restaurant.name}_img`} src={restaurant.image} className='restaurant-card-img' />
            <button onClick={addReview} >Add Review</button>
        </div>
    )

    function handleClick(){
        history.push({
            pathname: '/restaurant',
            state: {
                restaurant: restaurant,
                user_login: user_login,
                cart: cart
            }
        })
    }

    function addReview(){
        history.push({
            pathname: '/review',
            state: {
                restaurant: restaurant,
                user_login: user_login,
                cart: cart
            }
        })
    }
}

export default RestaurantCard;