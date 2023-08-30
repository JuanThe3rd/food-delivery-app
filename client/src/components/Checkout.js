import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import UserNavbar from './UserNavbar';

function Checkout() {
    const location = useLocation();
    const user_login = location.state[0];
    const [cart, setCart] = useState(location.state[1]);
    let total = 0;

    for(let i = 0; i < cart.length; i++){
        total += cart[i].price * cart[i].quantity;
    }

    return (
        <div>
            <UserNavbar user_login={user_login} cart={cart} />
            <h1>Checkout Page</h1>
            <ol>
            {cart.map(item => (
                <li key={item.id} >
                    <p>{item.item}</p>
                    <img src={item.image} alt={`${item.item}_img`} className='cart-item-img' />
                    <p>Price: ${item.price}</p>
                    <div className='quantity-container' >
                        <span onClick={() => incrementQuantity('minus', item)} className='minus-quantity'>-</span>
                        <span className='num-quantity'>{item.quantity}</span>
                        <span onClick={() => incrementQuantity('plus', item)} className='plus-quantity'>+</span>
                    </div>
                </li>
            ))}
            </ol>
            <h3>Sub-Total: ${total}</h3>
            <button onClick={handleCheckout} >Checkout</button>
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
/*
        fetch('/past_orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                total: total,
                user_id: user_login.user.id,
                restaurant_id: restaurant.id
            })
        })
*/
    }
}

export default Checkout;