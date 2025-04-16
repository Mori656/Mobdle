import { useEffect, useState } from 'react'
import './NavBar.css'
import { useAuthStore } from '../../stores/authStore'


function NavBar() {

    const { isLoggedIn, authLogout } = useAuthStore()

    return (
        <nav className="nb_navBar">
            <div className="nb_mainPageContainer">
                <div className="nb_mainPageContainerButton">
                    <a href="/"> Mobdle </a>
                </div>
            </div>
            <div className="nb_logInContainer">
                <div className="nb_logInContainerButton">
                    {isLoggedIn ? <a href='/' onClick={authLogout}>Log Out</a> : <a href="/login">Log In</a>}
                </div>
            </div>
        </nav>
    )
}


export default NavBar