import React from 'react';
import { useHistory } from "react-router-dom"

function UserNavbar({ user_login, cart }){
    const history = useHistory();

    return (
        <div className='nav-container' >
            <button className='nav-link' onClick={(e) => handleClick(e)} name='home' >Home</button>
            <button className='nav-link' onClick={(e) => handleClick(e)} name='account' >Account</button>
            <button className='nav-link' onClick={(e) => handleClick(e)} name='checkout' >Cart</button>
            <button className='nav-link' onClick={(e) => handleClick(e)} name='' >Log-Out</button>
        </div>
    )

    function handleClick(e){
        if (e.target.name !== ''){
            history.push({
                pathname: `/${e.target.name}`,
                state: [user_login, cart]
            })
        } else {
            history.push('/')
        }
    }
}

export default UserNavbar;