import { useEffect, useState } from 'react'
import './Leaderboard.css'
import axios from 'axios'
import { useAuthStore } from '../../stores/authStore';


function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    const { isAdmin, authAdmin } = useAuthStore()

    const deleteScore = (nickname) => {
        const token = localStorage.getItem('token');
        axios.delete('http://localhost:5000/api/leaderboard/delete', {
            data: { nickname },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            // Odśwież leaderboard po usunięciu
            setLeaderboard(prev => prev.filter(score => score.nickname !== nickname));
        })
        .catch(err => console.error('Błąd przy usuwaniu:', err));
    };

    useEffect(() => {
        // Pobieranie danych z backendu
        axios.get('http://localhost:5000/api/leaderboard/getAll')
          .then(res => setLeaderboard(scoreSort(res.data)))
          .catch(err => console.error(err));
    }, []);

    function scoreSort(input) {        
        return [...input].sort((a, b) => a.guessNumber - b.guessNumber);
    }

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const login = localStorage.getItem('login');
            try {
                const res = await axios.get(`http://localhost:5000/api/users/${login}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.isAdmin) {
                    authAdmin();
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych użytkownika:', error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [isAdmin]);
    
    return (
        <div className='lb_mainContainer'>
            <h1 className='lb_title'>Leaderboard</h1>
            <div className='lb_leaderboard'>
                {leaderboard.map((item, index) => ( 
                    <div key={index} className='lb_scoreItem'>
                        <div className='lb_index'>{index + 1}.</div>
                        <div className='lb_nickname'>{item.nickname}</div>
                        <div className='lb_score'>{item.guessNumber}</div>
                        {isAdmin && <div className='lb_deleteButton' onClick={() => deleteScore(item.nickname)}>X</div>}
                    </div>
                ))}
            </div>
                
        </div>
    )
}

export default Leaderboard