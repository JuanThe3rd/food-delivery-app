import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import UserNavbar from './UserNavbar'
import RestaurantNavbar from './RestaurantNavbar'

function Account() {
    const location = useLocation();
    const user_login = location.state[0];
    const cart = location.state[1];
    const [restaurant, setRestaurant] = useState();

    const [reviews, setReviews] = useState([]);
    const [pastOrders, setPastOrders] = useState([]);
    const [menuItems, setMenuItems] = useState();
    const [items, setItems] = useState([]);

    useEffect(() => {
        if(user_login.user_type === 'restaurant'){
            setReviews(user_login.restaurant.reviews.filter(review => review.review_type === 'restaurant'));
        } else if (user_login.user_type === 'user'){
            setRestaurant(location.state[2]);
            setReviews(user_login.user.reviews.filter(review => review.review_type === 'customer'));
        }

        fetch('/pastorders')
            .then(res => res.json())
            .then(allOrders => setPastOrders(allOrders.filter(order => order.user_id === user_login.user_id)))
    }, [])
/*
    if (pastOrders.length > 0){
        fetch('/menuItems')
            .then(res => res.json())
            .then(menu => setMenuItems(menu))

            console.log(menuItems)

        let itemIDs = pastOrders[0].menuItemIDs.split('-');

        for(let i = 0; i < itemIDs.length; i++){
            for(let j = 0; j < menuItems.length; j++){
                if (itemIDs[i] === menuItems[j]){
                    setItems([...items, menuItems[j]])
                }
            }
        }

        console.log(items)
    }
*/
    return (
        <div>
            { user_login.user_type === 'user' &&
                <div>
                    <UserNavbar user_login={user_login} cart={cart} restaurant={restaurant} />
                    <h1 className='account-header' >Account</h1>

                    <p>Welcome, {user_login.user.name}!</p>
                    <div className='account-img-container'>
                        <img src={user_login.user.profile_pic} alt={`${user_login.user.name}_img`} className='account-img' />
                    </div>
                    
                    <div className='past-orders-container' >
                        <h2>Past Orders:</h2>
                        <ol>
                            {pastOrders.map(order => (
                                <li key={order.id} >
                                    <p>Total: {order.total}</p>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <h2 className='reviews-title' >Reviews:</h2>
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