import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import UserNavbar from './UserNavbar';

function Checkout() {
    const location = useLocation();
    const history = useHistory();
    const user_login = location.state[0];
    const [cart, setCart] = useState(location.state[1]);
    const restaurant = location.state[2];
    const [msg, setMsg] = useState();
    const [reviews, setReviews] = useState([]);
    let total = 0;

    for(let i = 0; i < cart.length; i++){
        total += cart[i].price * cart[i].quantity;
    }

    useEffect(() => {
        fetch('/reviews')
            .then(res => res.json())
            .then(reviews => {
                const temp_reviews = [];

                for(let i = 0; i < reviews.length; i++){
                    if (reviews[i].restaurant_id === restaurant.id){
                        temp_reviews.push(reviews[i]);
                    }
                }

                setReviews(temp_reviews);
            })
    }, []);

    return (
        <div>
            {msg && 
                <div className='notification' >
                    Cart is empty, add some things before checking out
                </div>
            }
            <UserNavbar user_login={user_login} cart={cart} restaurant={restaurant} />
            <h1 className='page-title' >Cart</h1>

            <div className='cart-page-main-content'>
                <div className='cart-restaurant-details'>
                    <h1>{restaurant.name}</h1>
                    <img className='cart-restaurant-img' src={restaurant.image} alt={`${restaurant.name}_img`} />
                    <h3>Reviews:</h3>
                    {reviews.map(review => (
                        <div>
                            <h4>{review.user.name}:</h4>
                            <p>{review.content}</p>
                        </div>
                    ))

                    }
                </div>

                <div className='cart-details'>
                    <div className='cart-items'>
                        {cart.map(item => (
                            <div className='cart-item' key={item.id} >
                                <img className='cart-item-img' src={item.image} alt={`${item.item}_img`} />
                                <h3>{item.item}</h3>
                                <p>Price: ${item.price}</p>
                                <div className='quantity-container' >
                                    <span className='minus-quantity' onClick={() => incrementQuantity('minus', item)}>-</span>
                                    <span className='num-quantity'>{item.quantity}</span>
                                    <span className='plus-quantity' onClick={() => incrementQuantity('plus', item)}>+</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h4 className='total' >Total: ${Math.round(total * 100) / 100}</h4>
                    <button className='checkout-btn' onClick={handleCheckout} >Checkout</button>
                </div>
            </div>
        </div>
    );

    function incrementQuantity(action, item){
        let itemToChangePos = null;
        let newCart = [...cart];

        for (let i = 0; i < cart.length; i++){
            if (cart[i].id === item.id){
                itemToChangePos = i;
            }
        }

        if (action === 'minus'){
            if (newCart[itemToChangePos].quantity === 1){
                setCart(cart.filter(cartItem => cartItem.id !== item.id))
            } else {
                newCart[itemToChangePos].quantity--;
                setCart(newCart)
            }
        } else if (action === 'plus'){
            newCart[itemToChangePos].quantity++;
            setCart(newCart)
        }
    }

    function handleCheckout(){
        let cartIDS = '';
        let quantities = '';

        for(let i = 0; i < cart.length; i++){
            if (cartIDS === ''){
                cartIDS += `${cart[i].id}`
            } else {
                cartIDS += `-${cart[i].id}`
            }

            if (quantities === ''){
                quantities += `${cart[i].quantity}`
            } else {
                quantities += `-${cart[i].quantity}`
            }
        }

        if (cart.length === 0){
            setMsg(1);

            setTimeout(() => {
                setMsg(null);
            }, 2000)
        } else {
            fetch('/pastorders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    total: total,
                    menuItemIDs: cartIDS,
                    quantities: quantities,
                    user_id: user_login.user_id,
                    restaurant_id: cart[0].restaurant_id
                })
            })
                .then(res => res.json())
                .then(newOrder => {
                    history.push({
                        pathname: '/account',
                        state: [user_login, [], null]
                    })
                })
        }
    }
}

export default Checkout;