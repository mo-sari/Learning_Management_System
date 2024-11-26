import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  allUserData: null,
  isLoading: false,

  user: () => ({
    user_id: get().allUserData?.user_id || null,
    username: get().allUserData?.username || null,
  }),

  setUser: (user) =>
    set({
      allUserData: user,
    }),

  setLoading: (isLoading) => set({ isLoading }),
  isLoggedIn: () => get().allUserData != null,
}));

export { useAuthStore };
