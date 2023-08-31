import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import UserNavbar from './UserNavbar'
import RestaurantNavbar from './RestaurantNavbar'

function Account() {
    const location = useLocation();
    const user_login = location.state[0];
    const cart = location.state[1];

    const [reviews, setReviews] = useState([]);
    const [pastOrders, setPastOrders] = useState([]);

    useEffect(() => {
        if(user_login.user_type === 'restaurant'){
            setReviews(user_login.restaurant.reviews.filter(review => review.review_type === 'restaurant'));
        } else if (user_login.user_type === 'user'){
            setReviews(user_login.user.reviews.filter(review => review.review_type === 'customer'));
            setPastOrders(user_login.past_orders);
        }
    }, [])

    return (
        <div>
            { user_login.user_type === 'user' &&
                <div>
                    <UserNavbar user_login={user_login} cart={cart} />
                    <h1 className='account-header' >Account Page</h1>

                    <p>Welcome, {user_login.user.name}!</p>
                    <div className='account-img-container'>
                        <img src={user_login.user.profile_pic} alt={`${user_login.user.name}_img`} className='account-img' />
                    </div>
                    
                    { pastOrders &&
                        <div className='past-orders-container' >
                            {pastOrders.map(order => (
                                <div>
                                    <h1>{order.total}</h1>
                                </div>
                            ))}
                        </div>
                    }

                    <div className='reviews-container' >
                        {reviews.map((review) => (
                            <div className='review-card' key={review.id} >
                                <h3>{review.restaurant.name}</h3>
                                <p>Review: {review.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            }

            { user_login.user_type === 'restaurant' &&
                <div>
                    <RestaurantNavbar user_login={user_login} />
                    <h1 className='account-header' >Account Page</h1>

                    <p>Welcome, {user_login.restaurant.name}!</p>
                    <div className='account-img-container'>
                        <img src={user_login.restaurant.image} alt={`${user_login.restaurant.name}_img`} className='account-img' />
                    </div>

                    <div className='reviews-container' >
                        {reviews.map((review) => (
                            <div className='review-card' key={review.id} >
                                <h3>{review.user.name}</h3>
                                <p>Review: {review.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Account;