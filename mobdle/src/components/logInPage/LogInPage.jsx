import { useState } from 'react'
import './LogInPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

function LogInPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const [loginError, setLoginError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [wrongLogin, setWrongLogin] = useState(false)


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

        await axios.get('http://localhost:5000/api/users/get/' + login)
            .then(res => setUser(res.data))
            .catch(function (err) {
                console.error(err);
                setWrongLogin(true);
            });


        console.log(user)
    }


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