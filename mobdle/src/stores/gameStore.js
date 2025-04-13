import { create } from 'zustand'
import axios from 'axios';


export const useGameStore = create((set) => ({
    // =============================================================
    // Opcje
    options: JSON.parse(localStorage.getItem('options')) || [],
    setOptions: () => {
        axios.get('http://localhost:5000/api/mobs/getAll')
            .then((res) => {
                localStorage.setItem('options', JSON.stringify(res.data))
                set({options: res.data})
            })
            .catch(err => console.error(err));
    },
    modifyOptions: () => {
        set((state) => {
            const filteredOptions = state.options.filter(
                option => !state.triedOptions.some(tried => tried.name === option.name)
            );
              
            return {
                options: filteredOptions
            }
        })
    },

    // =============================================================
    // Wybrany mob
    chosenMob: '',
    setChosenMob: () => {
        axios.get('http://localhost:5000/api/mobs/daily')
            .then((res) => {
                localStorage.setItem('lastMob',JSON.stringify(res.data));
                set({ chosenMob: res.data });
            })
            .catch(err => console.error(err));
        
    },

    // =============================================================
    // Wybrane opcje
    // triedOptions: JSON.parse(localStorage.getItem('triedOptions')) || [],
    triedOptions: [],
    setTriedOptions: async () => {
        const token = localStorage.getItem('token');
        if(token) {
            const login = localStorage.getItem('login');
            const res = await axios.get(`http://localhost:5000/api/users/${login}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
                console.log("baza:", res.data.triedOptions)
            set({
                triedOptions: res.data.triedOptions
            })
        } else {
            set({
                triedOptions: JSON.parse(localStorage.getItem('triedOptions')) || []
            })
        }
    },
    modifyTriedOptions: async (selectedOption) => {
        try {
            const token = localStorage.getItem('token');
            if(token) {
                const res = await axios.post('http://localhost:5000/api/users/try', {
                    option: selectedOption
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                set({ triedOptions: res.data.triedOptions });
            } else {
                const existing = JSON.parse(localStorage.getItem('triedOptions')) || [];
                const tmp = [selectedOption, ...existing];
                localStorage.setItem('triedOptions', JSON.stringify(tmp));
                set({triedOptions: tmp})
            }
        } catch (err) {
            console.error("Błąd podczas zapisywania opcji:", err);
        }
    },
    wonToday: JSON.parse(localStorage.getItem('wonToday')) || false,
    setWonToday: async () => {
        const token = localStorage.getItem('token');
        if(token) {
            const login = localStorage.getItem('login');
            const res = await axios.get(`http://localhost:5000/api/users/${login}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            set({
                wonToday: res.data.wonToday
            })
        } else {
            set({
                wonToday: JSON.parse(localStorage.getItem('wonToday'))
            })
        }

    }
}));