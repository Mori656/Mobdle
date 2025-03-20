import './SignUpPage.css'
import { Link } from 'react-router-dom'
function SignInPage() {

        return (
            <div className="mainContainer">
                <div className="contentContainer">
                    <div className="logo">
                        Sign Up
                    </div>
                    <div className='rp_formContainer'>
                        <form method="post">
                            <label htmlFor="login">Login:</label><br/>
                            <input type='text'name='login' /><br/>
                            <label htmlFor="login">E-mail:</label><br/>
                            <input type='email'name='email' /><br/>
                            <label htmlFor="password">Password</label><br/>
                            <input type="text" name='password'/><br/>
                            <label htmlFor="password">Confirm Password</label><br/>
                            <input type="text" name='confirmPassword'/><br/>
                            <div className='rp_submitContainer'>
                            <div className='rp_signUpContainer'>
                                <Link to="/logIn"><p>Log In</p></Link>
                            </div>
                                
                                <input type="submit" className='rp_submitButton' value="Sign Up"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

export default SignInPage