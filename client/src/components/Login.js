import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router";

function Login() {
    const location = useLocation();

    const [loginData, setLoginData] = useState({});
    const [logins, setLogins] = useState();

    useEffect(() => {
        fetch('/logins')
            .then(res => res.json())
            .then(data => {
                const user_logins = [];

                for(let i = 0; i < data.length; i++){
                    if (data[i].user_type === 'user'){
                        user_logins.push(data[i])
                    };
                };
                setLogins(user_logins)
            });
    }, []);

    return (
        <div>
            <h1>Login Page!</h1>

            <form>
                <input placeholder='Username' name='username' onChange={handleChange} value={loginData.username} />
                <br />
                <input placeholder='Password' name='password' onChange={handleChange} value={loginData.password} type='password' />
                <br />
                <input type='submit' value='Log In' />
            </form>

            <label>Don't have an account?</label>
            <button onClick={() => {<Redirect to='/register' />}} >Register</button>
        </div>
    );

    function handleChange(e){
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }
}

export default Login;