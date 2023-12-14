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
        <div className='login-page' >
            {errorMsg && <div className='notification' >{errorMsg}</div>}
            <h1 className='login-title' >Underwater Eats</h1>
            <div className='login-form' >
                <h3 className='login' >Sign-In!</h3>

                <form onSubmit={handleSubmit} >
                    <div className='input-group'>
                        <input className='login-input' required type='text' id='username' name='username' onChange={handleChange} value={loginData.username}/>
                        <label className='login-label' for='username'>Username</label>
                    </div>

                    <div className='input-group'>
                        <input className='login-input' required type='password' id='password' name='password' onChange={handleChange} value={loginData.password}/>
                        <label className='login-label' for='username'>Password</label>
                    </div>

                    <input className='login-submit-btn' type='submit' value='Log-In' />
                </form>

                <label className='register-info' >Don't have an account? </label>
                <button className='register-btn' onClick={() => history.push('/register')} >Register</button>
            </div>
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
                    state: [login, []]
                })
            }
        } else {
            setErrorMsg('Invalid Login, Please Try Again')

            setTimeout(() => {
                setErrorMsg(null)
            }, 2000)
        };
    }
}

export default Login;