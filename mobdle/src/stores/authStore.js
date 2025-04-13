import { create } from 'zustand'


export const useAuthStore = create((set) => ({
    isLoggedIn: !!localStorage.getItem('token'),

    authLogin: (token) => {
        localStorage.setItem('token', token);
        set({ isLoggedIn: true });
    },

    authLogout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        set({ isLoggedIn: false });
    },
}));