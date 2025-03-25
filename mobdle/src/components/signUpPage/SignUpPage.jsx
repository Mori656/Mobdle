import { useState } from 'react'
import './SignUpPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios';


function SignInPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [popUp, setPopUp] = useState(false);

    const submitForm = (event) => {
        event.preventDefault();

        if (!login || !password || !repeatPassword) {
            // klasy
            return;
        }

        if ( password == repeatPassword) {
            axios.post('http://localhost:5000/api/users/add', {
                nickname: login,
                password: password,
                isAdmin: false
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
            });

            
        } else {
            // komunikat
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
                        <input className='rp_input' type='text' name='login' value={login} onChange={(e) => setLogin(e.target.value)}/><br/>

                        <label className='rp_label' htmlFor="password">Password</label><br/>
                        <input className='rp_input' type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}/><br/>

                        <label className='rp_label' htmlFor="password">Confirm Password</label><br/>
                        <input className='rp_input' type="password" name='confirmPassword' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/><br/>

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