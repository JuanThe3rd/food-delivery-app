import React from 'react';
import { useHistory } from 'react-router-dom';

function RestaurantNavbar({ user_login }){
    const history = useHistory()

    return (
        <div className='nav-container' >
            <button className='nav-link' onClick={(e) => handleClick(e)} name='' id='log-out-btn' >Log-Out</button>
            <button className='nav-link' onClick={(e) => handleClick(e)} name='menu' >Menu</button>
            <button className='nav-link' onClick={(e) => handleClick(e)} name='account' >Home</button>
        </div>
    )

    function handleClick(e){
        if (e.target.name === ''){
            history.push('/');
        } else{
            history.push({
                pathname: `/${e.target.name}`,
                state: [user_login,[]]
            })
        }
    }
}

export default RestaurantNavbar;