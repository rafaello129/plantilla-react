import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User, UpdateUserByAdminDto } from '../../domain/entities';
import {
  getAllUsersUseCase,
  updateUserByAdminUseCase,
} from '../../di/container';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;

  fetchAllUsers: () => Promise<void>;
  updateUserByAdmin: (uid: string, data: UpdateUserByAdminDto) => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      users: [],
      isLoading: false,
      error: null,

      fetchAllUsers: async () => {
        set({ isLoading: true, error: null });
        try {
          const users = await getAllUsersUseCase.execute();
          set({ users, isLoading: false });
        } catch (error: any) {
          set({ error: error.message || 'Error al cargar usuarios', isLoading: false });
        }
      },

      updateUserByAdmin: async (uid: string, data: UpdateUserByAdminDto) => {
        set({ isLoading: true, error: null });
        try {
          const updatedUser = await updateUserByAdminUseCase.execute(uid, data);
          set((state) => ({
            users: state.users.map((user) => (user.uid === uid ? updatedUser : user)),
            isLoading: false,
          }));
        } catch (error: any) {
          set({ error: error.message || 'Error al actualizar usuario', isLoading: false });
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    { name: 'UserStore' }
  )
);