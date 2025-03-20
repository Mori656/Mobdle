import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {

        return (
            <div>
                <div className="mainContainer">
                    <div className="contentContainer">
                        <div className="logo">
                            MOBDLE
                        </div>
                        
                        <Link to="/game">
                            <button className="hp_startButton">
                                Start game
                            </button>
                        </Link> 
                    </div>
                </div>
            </div>
        )
    }

export default HomePage