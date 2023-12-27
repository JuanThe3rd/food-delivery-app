import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Register() {
    const history = useHistory();

    const [errorMsg, setErrorMsg] = useState(null);
    const [accountType, setAccountType] = useState();
    const [accountData, setAccountData] = useState({});
    const [newAccountID, setNewAccountID] = useState();
    const [msg, setMsg] = useState();

    return (
        <div className='login-page' >
            {msg && 
                <div className='notification' >
                    {msg}
                </div>
            }
            <h1 className='login-title' >Register</h1>

            <div className='register-content'>
                <div className='register-form' >
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='input-group'>
                            <input className='login-input' required type='text' id='username' name='username' onChange={handleChange} value={accountData.username}/>
                            <label className='login-label' for='username'>Username</label>
                        </div>

                        <div className='input-group'>
                            <input className='login-input' required type='password' id='password' name='password' onChange={handleChange} value={accountData.password}/>
                            <label className='login-label' for='password'>Password</label>
                        </div>

                        <div className='input-group'>
                            <input className='login-input' required type='password' id='confirm-password' name='confirm-password' onChange={handleChange} value={accountData['confirm-password']}/>
                            <label className='login-label' for='confirm-password'>Confirm Password</label>
                        </div>

                        <div className='register-select'>
                            <label>Account Type: </label>
                            <select onChange={(e) => setAccountType(e.target.value)}>
                                <option value='choosing'>-- Select --</option>
                                <option value='user'>User</option>
                                <option value='restaurant'>Restaurant</option>
                            </select>
                            <br />
                        </div>

                        {accountType === 'user' && 
                            <div>
                                <div className='input-group'>
                                    <input className='login-input' required type='text' id='firstname' name='firstname' onChange={handleChange} value={accountData.firstname}/>
                                    <label className='login-label' for='firstname'>First Name</label>
                                </div>

                                <div className='input-group'>
                                    <input className='login-input' required type='text' id='profile_pic' name='profile_pic' onChange={handleChange} value={accountData['profile_pic']}/>
                                    <label className='login-label' for='profile_pic'>Profile Picture URL</label>
                                </div>
                            </div>
                        }

                        {accountType === 'restaurant' &&
                            <div>
                                <div className='input-group'>
                                    <input className='login-input' required type='text' id='name' name='name' onChange={handleChange} value={accountData.name}/>
                                    <label className='login-label' for='name'>Restaurant Name</label>
                                </div>

                                <div className='input-group'>
                                    <input className='login-input' required type='text' id='image' name='image' onChange={handleChange} value={accountData.image}/>
                                    <label className='login-label' for='image'>Restaurant Image URL</label>
                                </div>

                                <div className='input-group'>
                                    <input className='login-input' required type='text' id='owner' name='owner' onChange={handleChange} value={accountData.owner}/>
                                    <label className='login-label' for='owner'>Owner Name</label>
                                </div>
                            </div>
                        }

                        <input className='login-submit-btn' type='submit' />
                    </form>
                </div>

                <div className='verifications-form' >
                    <p>Password must be at least 5 characters long.</p>

                    {accountType === 'user' &&
                        <div>
                            <p>Firstname must be at least 2 characters long.</p>
                            <p>Profile picture must be an Image URL address.</p>
                        </div>
                    }

                    {accountType === 'restaurant' &&
                        <div>
                            <p>Restaurant name must be at least 2 characters long.</p>
                            <p>Restaurant image must be an Image URL address.</p>
                            <p>Owner name must be at least 2 characters long.</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );

    function handleChange(e){
        setAccountData({...accountData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();

        if (accountData.password.length >= 5){
            if (accountData.password === accountData['confirm-password']){
                if (accountType === 'user'){
                    if (accountData.firstname.length > 1){
                        fetch(`${accountData.profile_pic}`)
                            .then(res => {
                                if (res.status !== 404){
                                    fetch('/users', {
                                        method: 'POST',
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify({
                                            name: accountData.firstname,
                                            profile_pic: accountData.profile_pic
                                        })
                                    })
                                        .then(res => res.json())
                                        .then(new_account => {
                                            fetch('/logins', {
                                                method: 'POST',
                                                headers: {'Content-Type': 'application/json'},
                                                body: JSON.stringify({
                                                    username: accountData.username,
                                                    password: accountData.password,
                                                    user_type: accountType,
                                                    user_id: new_account.id,
                                                    restaurant_id: null
                                                })
                                            })
                                                .then(res => res.json())
                                                .then(newLogin => {
                                                    setMsg('Account Successfully Created! Redirecting...');
                                                    setTimeout(() => {
                                                        history.push('/');
                                                    }, 3000)
                                                })
                                        })
                                } else {
                                    setMsg('Profile picture must be a valid URL');

                                    setTimeout(() => {
                                        setMsg(null);
                                    }, 3000);
                                }
                            });
                    } else {
                        setMsg('Firstname must be at least 2 characters long');

                        setTimeout(() => {
                            setMsg(null);
                        }, 3000);
                    }
                } else if (accountType ==='restaurant'){
                    if (accountData.name.length > 1){
                        fetch(`${accountData.image}`)
                            .then(res => {
                                if (res.status !== 404){
                                    if (accountData.owner.length > 1){
                                        fetch('/restaurants', {
                                            method: 'POST',
                                            headers: {'Content-Type': 'application/json'},
                                            body: JSON.stringify({
                                                name: accountData.name,
                                                image: accountData.image,
                                                owner: accountData.owner
                                            })
                                        })
                                            .then(res => res.json())
                                            .then(new_account => {
                                                fetch('/logins', {
                                                    method: 'POST',
                                                    headers: {'Content-Type': 'application/json'},
                                                    body: JSON.stringify({
                                                        username: accountData.username,
                                                        password: accountData.password,
                                                        user_type: 'restaurant',
                                                        restaurant_id: new_account.id,
                                                        user_id: null
                                                    })
                                                })
                                                    .then(res => res.json())
                                                    .then(newLogin => {
                                                        setMsg('Account Successfully Created! Redirecting...');
                                                        setTimeout(() => {
                                                            history.push('/');
                                                        }, 3000)
                                                    })
                                            })
                                    } else {
                                        setMsg('Owner name must be at least 2 characters long');

                                        setTimeout(() => {
                                            setMsg(null);
                                        }, 3000);
                                    }
                                } else {
                                    setMsg('Restaurant Image must be a valid URL');

                                    setTimeout(() => {
                                        setMsg(null);
                                    }, 3000);
                                }
                            });
                    } else {
                        setMsg('Restaurant name must be at least 2 characters long');

                        setTimeout(() => {
                            setMsg(null);
                        }, 3000);
                    }
                }
            } else{
                setMsg('Passwords do not match')

                setTimeout(() => {
                    setMsg(null);
                }, 3000)
            }
        } else {
            setMsg('Password must be at least 5 characters long')

            setTimeout(() => {
                setMsg(null);
            }, 3000);
        }
    }
}

export default Register;