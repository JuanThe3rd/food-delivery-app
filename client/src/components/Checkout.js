import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import UserNavbar from './UserNavbar';

function Checkout() {
    const location = useLocation();
    const user_login = location.state[0];
    const [cart, setCart] = useState(location.state[1]);
    let total = 0;

    for(let i = 0; i < cart.length; i++){
        total += cart[i].price;
    }

    return (
        <div>
            <UserNavbar user_login={user_login} cart={cart} />
            <h1>Checkout Page</h1>
            <ol>
            {cart.map(item => (
                <li>
                    <p>{item.item} <button onClick={() => handleClick(item)} >-</button></p>
                    <p>Price: ${item.price}</p>
                </li>
            ))}
            </ol>
            <h3>Total: ${total}</h3>
        </div>
    );

    function handleClick(deletedItem){
        let flag = false;
        
        setCart(cart.filter(item => {
            if (item.id !== deletedItem.id || flag === true){
                return item
            } else{
                flag = true;
            }
        }))
    }
}

export default Checkout;