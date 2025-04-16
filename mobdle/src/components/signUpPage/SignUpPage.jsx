import { useState } from 'react'
import './SignUpPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios';


function SignInPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [popUp, setPopUp] = useState(false);

    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);
    const [sameLoginError, setSameLoginError] = useState(false);

    const [warning, setWarning] = useState(false);

    const submitForm = (event) => {
        event.preventDefault();

        setLoginError(false)
        setPasswordError(false)
        setRepeatPasswordError(false)
        setSameLoginError(false)
        setWarning(false);
        
        if (!login || !password || !repeatPassword ) {
            setLoginError(!login);
            setPasswordError(!password);
            setRepeatPasswordError(!repeatPassword);
            return;
        }

        if ( password == repeatPassword) {
            axios.post('http://localhost:5000/api/users/add', {
                nickname: login,
                password: password,
                isAdmin: false,
            })
            .then(function (response) {
                console.log("dodano: ", response);
                setLogin("");
                setPassword("");
                setRepeatPassword("");

                setPopUp(true);
            })
            .catch(function (error) {
                console.log("rejestracja error: ", error);
                if(error.status == 409){
                    setSameLoginError(true);
                }
            });

            
        } else {
            setPasswordError(true);
            setRepeatPasswordError(true);
            setWarning(true)
        }
    }

    return (
        <div className="mainContainer">
            <div className="contentContainer">
                <div className="logo">
                    Sign Up
                </div>
                <div className='rp_formContainer'>
                    <form method="post">
                        <label className='rp_label' htmlFor="login">Login:</label><br/>
                        <input 
                            className={loginError ? "rp_input rp_errorField" : "rp_input"} 
                            type='text' 
                            name='login' 
                            value={login} 
                            onChange={(e) => setLogin(e.target.value)} 
                            required
                        /><br/>

                        <label className='rp_label' htmlFor="password">Password</label><br/>
                        <input 
                            className={passwordError ? "rp_input rp_errorField" : "rp_input"} 
                            type="password" 
                            name='password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        /><br/>

                        <label className='rp_label' htmlFor="password">Confirm Password</label><br/>
                        <input 
                            className={repeatPasswordError ? "rp_input rp_errorField" : "rp_input"} 
                            type="password" 
                            name='confirmPassword' 
                            value={repeatPassword} 
                            onChange={(e) => setRepeatPassword(e.target.value)} 
                            required
                        /><br/>

                        <p className={sameLoginError ? "rp_warning" : "rp_hidden"}>Login already taken!</p>
                        <p className={warning ? "rp_warning" : "rp_hidden"}>Passwords don't match!</p>
                        <p className={(loginError || passwordError || repeatPasswordError) ? "rp_warning" : "rp_hidden"}>All fields must be filled in!</p>

                        <div className='rp_submitContainer'>
                            <div className='rp_signUpContainer'>
                                <Link to="/logIn"><p>Log In</p></Link>
                            </div>

                            <button className='rp_input rp_submitButton' onClick={submitForm}>Sign Up</button>
                        </div>
                    </form>
                </div>

                {popUp && <div className='rp_blocker'>
                    <div className='rp_popUpContainer'>
                        <p>Signed up succesfully!</p>
                        <Link to="/logIn">
                            <button className='rp_input rp_submitButton'>Continue</button>
                        </Link>
                    </div>
                </div>}
                
            </div>
        </div>
    )
}

export default SignInPage