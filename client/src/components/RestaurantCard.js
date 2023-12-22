import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function RestaurantCard({ restaurant, user_login, cart }){
    const history = useHistory();
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        fetch('/reviews')
            .then(res => res.json())
            .then(reviews => {
                const temp_reviews = [];

                for(let i = 0; i < reviews.length; i++){
                    if (reviews[i].restaurant_id === restaurant.id && reviews[i].review_type === 'restaurant'){
                        temp_reviews.push(reviews[i]);
                    }
                }

                setReviews(temp_reviews);
            });
    }, [])

    return (
        <div className='restaurant-card' >
            <img onClick={handleClick} alt={`${restaurant.name}_img`} src={restaurant.image} className='restaurant-card-img' />
            <h2>{restaurant.name}</h2>
            {reviews !== null &&
                <p>{reviews.length} Reviews</p>
            }
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
}

export default RestaurantCard;