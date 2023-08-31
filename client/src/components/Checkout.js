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
    let total = 0;

    for(let i = 0; i < cart.length; i++){
        total += cart[i].price * cart[i].quantity;
    }

    return (
        <div>
            {msg && 
                <div className='notification' >
                    Cart is empty, add some things before checking out
                </div>
            }
            <UserNavbar user_login={user_login} cart={cart} restaurant={restaurant} />
<<<<<<< HEAD
            <h1>Cart</h1>
=======
            <h1>Checkout Page</h1>
            {msg && 
                <div className='notification' >
                    <p>Cart is empty, add some things before checking out</p>
                </div>
            }
>>>>>>> 11a8878d8f138d8bc4cdff72eec84dac6e872b61
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
<<<<<<< HEAD
        let cartIDS = '';
        let quantities = '';
=======
        let cartIDS = ''
        let quantities = ''
>>>>>>> 11a8878d8f138d8bc4cdff72eec84dac6e872b61

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
<<<<<<< HEAD
                    menuItemIDs: cartIDS,
                    quantities: quantities,
                    user_id: user_login.user_id,
                    restaurant_id: cart[0].restaurant_id
=======
                    user_id: user_login.user.id,
                    restaurant_id: cart[0].restaurant_id,
                    menuItemIDs: cartIDS,
                    quantities: quantities
>>>>>>> 11a8878d8f138d8bc4cdff72eec84dac6e872b61
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