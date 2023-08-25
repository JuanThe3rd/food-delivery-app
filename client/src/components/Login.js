import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Login() {
    const history = useHistory();

    const [loginData, setLoginData] = useState({});
    const [logins, setLogins] = useState();
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        fetch('/logins')
            .then(res => res.json())
            .then(setLogins);
    }, []);

    return (
        <div>
            <h1>Login Page!</h1>

            {errorMsg && <div>{errorMsg}</div>}
            <form onSubmit={handleSubmit}>
                <input placeholder='Username' name='username' onChange={handleChange} value={loginData.username} />
                <br />
                <input placeholder='Password' name='password' onChange={handleChange} value={loginData.password} type='password' />
                <br />
                <input type='submit' value='Log In' />
            </form>

            <label>Don't have an account?</label>
            <button onClick={() => history.push('/register')} >Register</button>
        </div>
    );

    function handleChange(e){
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();
        let flag = 0;
        let login = null;

        for (let i = 0; i < logins.length; i++){
            if (logins[i].username === loginData.username && logins[i].password === loginData.password){
                flag = 1;
                login = logins[i];
            };
        };

        if (flag === 1){
            if (login.user_type === 'user'){
                history.push({
                    pathname: '/home',
                    state: [login, []]
                });
            } else if (login.user_type === 'restaurant'){
                history.push({
                    pathname: '/account',
                    state: login
                })
            }
        } else {
            setErrorMsg('Invalid Login, Please Try Again')
        };
    }
}

export default Login;