import './NavBar.css'
function NavBar() {
    return (
        <nav className="nb_navBar">
            <div className="nb_mainPageContainer">
                <div className="nb_mainPageContainerButton">
                    <a href="/"> Mobdle </a>
                </div>
            </div>
            <div className="nb_logInContainer">
                <div className="nb_logInContainerButton">
                    <a href="/login">Log In</a>
                </div>
            </div>
        </nav>
    )
}


export default NavBar