import { useEffect, useState } from 'react'
import './Leaderboard.css'
import axios from 'axios'


function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        // Pobieranie danych z backendu
        axios.get('http://localhost:5000/api/leaderboard/getAll')
          .then(res => setLeaderboard(scoreSort(res.data)))
          .catch(err => console.error(err));
    }, []);

    function scoreSort(input) {        
        return [...input].sort((a, b) => a.guessNumber - b.guessNumber);
    }

    return (
        <div>
            <h1 className='lb_title'>Leaderboard</h1>
            <div className='lb_leaderboard'>
                {leaderboard.map((item, index) => ( 
                    <div key={index} className='lb_scoreItem'>
                        <div className='lb_index'>{index + 1}.</div>
                        <div className='lb_nickname'>{item.nickname}</div>
                        <div className='lb_score'>{item.guessNumber}</div>
                    </div>
                ))}
            </div>
                
        </div>
    )
}

export default Leaderboard