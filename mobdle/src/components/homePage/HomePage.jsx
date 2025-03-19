import NavBar from "../navBar/NavBar"
import './HomePage.css'
import GamePage from "../gamePage/GamePage"
import { useState } from "react"

function HomePage() {

    const [game,setGame] = useState(false)

    const startGame = () => {
        setGame(true);
    };

        return (
            <div>
                <NavBar/>
                <div className="hp_mainContainer">
                    
                    <div className="hp_contentContainer">
                        <div className="hp_logo">
                            MOBDLE
                        </div>
                        {!game ? <div className="hp_startButton" onClick={startGame}>
                            Start game
                        </div>:
                        <GamePage/>
                        }
                        
                    </div>
                </div>
            </div>
        )
    }

export default HomePage