import create from 'zustand';
import { persist } from 'zustand/middleware';

export const usePage = create(
    persist(
        (set) => ({
            page: 1,
            addPage: (page: number) => set((state) => ({ ...state, page })),
        }),
        { name: 'page_gamovie' }
    )
);
