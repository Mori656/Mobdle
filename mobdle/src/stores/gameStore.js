import { create } from 'zustand'
import axios from 'axios';


export const useGameStore = create((set) => ({
    // =============================================================
    // Opcje
    options: JSON.parse(localStorage.getItem('options')) || [],
    setOptions: () => {
        axios.get('http://localhost:5000/api/mobs/getAll')
            .then((res) => {
                localStorage.setItem('triedOptions', JSON.stringify([]))
                localStorage.setItem('options', JSON.stringify(res.data))
                set({options: res.data})
            })
            .catch(err => console.error(err));
    },
    modifyOptions: (name) => {

        set((state) => {
            const filteredOptions = state.options.filter(option => option.name !== name);
            localStorage.setItem('options', JSON.stringify(filteredOptions));
            
            return {
                options: filteredOptions
            }
        });
    },

    // =============================================================
    // Wybrany mob
    chosenMob: JSON.parse(localStorage.getItem('lastMob')),
    setChosenMob: (mob) => {
        localStorage.setItem('lastMob',JSON.stringify(mob));
        set({ chosenMob: mob });
    },

    // =============================================================
    // Wybrane opcje
    triedOptions: JSON.parse(localStorage.getItem('triedOptions')) || [],
    setTriedOptions: async (selectedOption) => {
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
                const tmp = [selectedOption, ...JSON.parse(localStorage.getItem('triedOptions'))];
                localStorage.setItem('triedOptions', JSON.stringify(tmp));
                set({triedOptions: tmp})
            }
        } catch (err) {
            console.error("Błąd podczas zapisywania opcji:", err);
        }
    },
}));