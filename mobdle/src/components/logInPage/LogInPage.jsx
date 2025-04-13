import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LogInPage.css'
import axios from 'axios';

import { useAuthStore } from '../../stores/authStore'


function LogInPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const [loginError, setLoginError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [wrongLogin, setWrongLogin] = useState(false)
    
    const { authLogin } = useAuthStore()
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {

        setLoginError(false)
        setPasswordError(false)
        setWrongLogin(false);

        event.preventDefault();

        if (!login || !password) {
            setLoginError(!login);
            setPasswordError(!password);
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/users/auth/' ,{ 
                login,
                password,
            });
            localStorage.setItem('login', login);
            authLogin(res.data.token);
            navigate('/')
        } catch (err) {
            setWrongLogin(true);
        }
    };


    return (
        <div className="mainContainer">
            <div className="contentContainer">
                <div className="logo">
                    LOG IN
                </div>
                <div className='lp_formContainer'>
                    <form method="post">
                        <label className='lp_label' htmlFor="login">Login:</label><br/>
                        <input 
                            className={loginError ? "lp_input lp_errorField" : "lp_input"} 
                            type='text' 
                            name='login' 
                            value={login} 
                            onChange={(e) => setLogin(e.target.value)} 
                            required
                        /><br/>
                        
                        <label className='lp_label' htmlFor="password">Password</label><br/>
                        <input 
                            className={passwordError ? "lp_input lp_errorField" : "lp_input"} 
                            type="password" 
                            name='password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        /><br/>

                        <p className={(loginError || passwordError) ? "rp_warning" : "rp_hidden"}>All fields must be filled in!</p>
                        <p className={(wrongLogin) ? "rp_warning" : "rp_hidden"}>Wrong login or password!</p>

                        <div className='lp_submitContainer'>
                        <div className='lp_signUpContainer'>
                            <Link to="/signUp"><p>Sign Up</p></Link>
                        </div>
                            <button className='lp_submitButton lp_input' onClick={handleSubmit}>Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogInPage