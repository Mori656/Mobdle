import NavBar from "../navBar/NavBar"
import './HomePage.css'

function HomePage() {
        return (
            <div>
                <NavBar/>
                <div className="hp_mainContainer">
                    
                    <div className="hp_contentContainer">
                        <div className="hp_logo">
                            MOBDLE
                        </div>
                        <div className="hp_startButton">
                            Start game
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default HomePage