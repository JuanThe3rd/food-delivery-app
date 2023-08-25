import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import UserNavbar from './UserNavbar'

function Restaurant() {
    const [items, setItems] = useState();
    const [cart, setCart] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [msg, setMsg] = useState();

    const location = useLocation();
    const data = location.state;
    const restaurant = data.restaurant;
    const user_login = data.user_login;
    const old_cart = data.cart;

    useEffect(() => {
        fetch('/menuItems')
            .then(res => res.json())
            .then(menuItems => setItems(menuItems.filter(item => item.restaurant.id === restaurant.id)))

        if (old_cart.length !== 0){
            setCart(old_cart)
        }

        setReviews(restaurant.reviews.filter(review => review.review_type === 'restaurant'))

        console.log(reviews)
    }, [])

    return (
        <div>
            <UserNavbar user_login={user_login} cart={cart}/>
            <div className='menu-container' >
                <h1>{restaurant.name}</h1>

                {msg &&
                    <div className='notification' >
                        <h3>{msg}</h3>
                    </div>
                }

                {items?.map(item => (
                    <div key={item.id} className='menu-item-container' >
                        <img src={item.image} alt={`${item.item}_img`} className='menu-item-img' />
                        <h3>{item.item}</h3>
                        <p>Price: {item.price}</p>
                        <button className='add-to-cart-btn' onClick={() => handleClick(item)} >Add to cart</button>
                    </div>
                ))}

                <h3>Reviews:</h3>
                {reviews?.map(review => (
                    <div className='review-container' >
                        <p>{review.user.name}:</p>
                        <p>{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    function handleClick(newItem){
        setCart([...cart, newItem]);
        setMsg('Item added to cart');
        
        setTimeout(() => {
            setMsg(null);
        }, 2000);
    }
}

export default Restaurant;
