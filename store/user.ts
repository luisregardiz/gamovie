import create from "zustand";
import { persist } from "zustand/middleware";

export const useSessionId = create(
    persist(
        (set) => ({
            sessionId: "",
            addSessionId: (sessionId: string) =>
                set((state) => ({ ...state, sessionId })),
        }),
        { name: "user-gamovie" }
    )
);

type User = {
    userId: string;
    addUserId: (userId: string) => void;
};

export const useUserData = create(
    persist(
        (set) => ({
            userId: "",
            addUserId: (userId: string) =>
                set((state) => ({ ...state, userId })),
        }),
        { name: "userid-gamovie" }
    )
);
