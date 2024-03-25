import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  user: {
    email: string | null;
    name: string | null;
  } | null;
  setUser: (user: UserState["user"]) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(devtools((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null })),
})));

export default useUserStore;
