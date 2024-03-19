import { create } from "zustand";

interface UserState {
  user: {
    email: string | null;
    name: string | null;
  } | null;
  setUser: (user: UserState["user"]) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null })),
}));

export default useUserStore;
