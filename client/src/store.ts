import { create } from 'zustand';
import { getAllUsers } from './api/fetchApi';
import { Person } from './PersonType';

//declare types for the store
interface UserStore {
  users: Person[];
  fetchUsers: () => Promise<void>;
}

//create the store
const userStore = create<UserStore>(set => ({
  users: [],
  fetchUsers: async () => {
    const users = await getAllUsers();
    set({ users });
  },
}));

export default userStore;
