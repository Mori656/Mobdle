import './LogInPage.css'
import { Link } from 'react-router-dom'
function LogInPage() {

        return (
            <div className="mainContainer">
                <div className="contentContainer">
                    <div className="logo">
                        LOG IN
                    </div>
                    <div className='lp_formContainer'>
                        <form method="post">
                            <label htmlFor="login">Login:</label><br/>
                            <input type='text'name='login' /><br/>
                            <label htmlFor="password">Password</label><br/>
                            <input type="password" name='password'/><br/>
                            <div className='lp_submitContainer'>
                            <div className='lp_signUpContainer'>
                                <Link to="/signUp"><p>Sign Up</p></Link>
                            </div>
                                <input type="submit" className='lp_submitButton' value="Log In"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

export default LogInPage