import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Register() {
    const history = useHistory();

    const [accountType, setAccountType] = useState();
    const [accountData, setAccountData] = useState({});
    const [newAccountID, setNewAccountID] = useState();
    const [msg, setMsg] = useState();

    return (
        <div className='login-page' >
            <h1 className='login-title' >Register</h1>

            {msg && 
                <div className='notification' >
                    {msg}
                </div>
            }

            <div className='login-form' >
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input className='login-input' placeholder='Username' onChange={handleChange} name='username' />
                    <br />
                    <input className='login-input' placeholder='Password' onChange={handleChange} name='password' type='password' />
                    <br />
                    <label>Account Type: </label>
                    <select className='login-input' onChange={(e) => setAccountType(e.target.value)}>
                        <option value='choosing'>-- Select --</option>
                        <option value='user'>User</option>
                        <option value='restaurant'>Restaurant</option>
                    </select>
                    <br />

                    {accountType === 'user' && 
                        <div>
                            <input className='login-input' placeholder='Firstname' name='firstname' onChange={handleChange} />
                            <br/ >
                            <input className='login-input' placeholder='Profile Picture URL' name='profile_pic' onChange={handleChange} />
                            <br />
                        </div>
                    }

                    {accountType === 'restaurant' &&
                        <div>
                            <input className='login-input' placeholder='Restaurant Name' onChange={handleChange} name='name' value={accountData.name} />
                            <br />
                            <input className='login-input' placeholder='Image URL' onChange={handleChange} name='image' value={accountData.image} />
                            <br />
                            <input className='login-input' placeholder='Owner Name' onChange={handleChange} name='owner' value={accountData.owner} />
                            <br />
                        </div>
                    }

                    <input className='login-submit-btn' type='submit' />
                </form>
            </div>
        </div>
    );

    function handleChange(e){
        setAccountData({...accountData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();

        if (accountType === 'user'){
            fetch('/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: accountData.firstname,
                    profile_pic: accountData.profile_pic
                })
            })
                .then(res => res.json())
                .then(account => setNewAccountID(account.id))
                .catch(error => {
                    setMsg('Please follow instructions for creating an account');
                })

            fetch('/logins', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: accountData.username,
                    password: accountData.password,
                    user_type: 'user',
                    user_id: newAccountID,
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
                .catch(error => {
                    setMsg('Please follow instructions for creating an account');
                })

        } else if (accountType ==='restaurant'){
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
                .then(account => setNewAccountID(account.id))
                .catch(error => {
                    setMsg('Please follow instructions for creating an account');
                })
            
            fetch('/logins', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: accountData.username,
                    password: accountData.password,
                    user_type: 'restaurant',
                    restaurant_id: newAccountID,
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
                .catch(error => {
                    setMsg('Please follow instructions for creating an account');
                })
        }
    }
}

export default Register;