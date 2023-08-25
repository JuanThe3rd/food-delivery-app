import React from 'react';
import { useHistory } from 'react-router-dom';

function RestaurantNavbar({ user_login }){
    const history = useHistory()

    return (
        <div className='nav-container' >
            <button className='nav-link' onClick={(e) => handleClick(e)} name='account' >Home</button>
            <button className='nav-link' onClick={(e) => handleClick(e)} name='' >Log-Out</button>
        </div>
    )

    function handleClick(e){
        if (e.target.name === ''){
            history.push('/');
        } else if (e.target.name === 'account'){
            history.push({
                pathname: '/account',
                state: [user_login,[]]
            })
        }
    }
}

export default RestaurantNavbar;