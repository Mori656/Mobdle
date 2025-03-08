import './NavBar.css'
function NavBar() {
    return (
        <nav className="navBar">
            <div className="mainPageContainer">
                <div className="mainPageContainerButton">
                    <a href="/"> Mobdle </a>
                </div>
            </div>
            <div className="logInContainer">
                <div className="logInContainerButton">
                    <a href="/login">Log In</a>
                </div>
            </div>
        </nav>
    )
}


export default NavBar