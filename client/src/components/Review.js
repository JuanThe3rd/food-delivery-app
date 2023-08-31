import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import UserNavbar from './UserNavbar'

function Review(){
    const location = useLocation();
    const restaurant = location.state.restaurant;
    const user_login = location.state.user_login;
    const cart = location.state.cart;

    const [comment, setComment] = useState();
    const [msg, setMsg] = useState();

    return (
        <div>
            <UserNavbar user_login = {user_login} cart={cart} restaurant={restaurant} />
            <div className='review-container'>
                <h1>Review page</h1>
                {msg && 
                    <div className='notification' >
                        <h3>{msg}</h3>
                    </div>
                }
                <form onSubmit={handleSubmit}>
                    <label>Leave Review: </label> 
                    <br />
                    <input type='text' onChange={handleChange} value={comment} placeholder='Review' />
                    <br />
                    <input type='submit' value='Submit' />
                </form>
            </div>
        </div>
    )

    function handleChange(e){
        setComment(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();

        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: comment,
                review_type: 'restaurant',
                user_id: user_login.user.id,
                restaurant_id: restaurant.id
            })
        })
            .then(res => res.json())
            .then(newReview => {
                setMsg('Review Submitted!')

                setTimeout(() => {
                    setMsg(null)
                }, 2000)
            })
    }
}

export default Review;