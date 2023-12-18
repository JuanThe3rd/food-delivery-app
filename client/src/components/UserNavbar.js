import React from 'react';
import { useHistory } from "react-router-dom"

function UserNavbar({ user_login, cart, restaurant }){
    const history = useHistory();

    return (
        <div className='nav-container' >
            <button className='nav-link' onClick={(e) => handleClick(e)} name='/' >Log-Out</button>
            <button className='nav-link' onClick={(e) => handleClick(e)} name='checkout' >Cart</button>
            <button className='nav-link' onClick={(e) => handleClick(e)} name='account' >Account</button>
            <button className='nav-link' onClick={(e) => handleClick(e)} name='home' >Home</button>
        </div>
    )

    function handleClick(e){
        history.push({
            pathname: `/${e.target.name}`,
            state: [user_login, cart, restaurant]
        })
    }
}

export default UserNavbar;