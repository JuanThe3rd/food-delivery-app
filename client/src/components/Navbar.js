import React from 'react';
import { useHistory } from "react-router-dom"

function Navbar({ user_login }){
    const history = useHistory();

    return (
        <div>
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
                state: user_login
            })
        } else {
            history.push('/')
        }
    }
}

export default Navbar;