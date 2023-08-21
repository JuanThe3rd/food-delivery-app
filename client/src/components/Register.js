import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Register() {
    const history = useHistory();

    const [accountType, setAccountType] = useState();
    const [accountData, setAccountData] = useState({});
    const [newAccountID, setNewAccountID] = useState();
    const [msg, setMsg] = useState();

    return (
        <div>
            <h1>Registration Page</h1>

            {msg && 
                <div>
                    {msg}
                </div>
            }

            <form onSubmit={(e) => handleSubmit(e)}>
                <input placeholder='Username' onChange={handleChange} name='username' />
                <br />
                <input placeholder='Password' onChange={handleChange} name='password' type='password' />
                <br />
                <label>Account Type: </label>
                <select onChange={(e) => setAccountType(e.target.value)}>
                    <option value='choosing'>-- Select --</option>
                    <option value='user'>User</option>
                    <option value='restaurant'>Restaurant</option>
                </select>
                <br />

                {accountType === 'user' && 
                    <div>
                        <input placeholder='Firstname' name='firstname' onChange={handleChange} />
                        <br/ >
                        <input placeholder='Profile Picture URL' name='profile_pic' onChange={handleChange} />
                        <br />
                    </div>
                }

                {accountType === 'restaurant' &&
                    <div>
                        <input placeholder='Restaurant Name' onChange={handleChange} name='name' value={accountData.name} />
                        <br />
                        <input placeholder='Image URL' onChange={handleChange} name='image' value={accountData.image} />
                        <br />
                        <input placeholder='Owner Name' onChange={handleChange} name='owner' value={accountData.owner} />
                        <br />
                    </div>
                }

                <input type='submit' />
            </form>
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
                .catch(setMsg)

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
                        history.push('/home');
                    }, 3000)
                })
                .catch(setMsg)

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
                .catch(setMsg)
            
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
                    setMsg('Account Successfully Created!');
                    setTimeout(() => {
                        history.push('/home');
                    }, 3000)
                })
        }
    }
}

export default Register;