import { useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import type { UserRole } from '../../../../domain/constants/userRoles';
import { useUserStore } from '../../../store/userStore';

export const useUsersManagement = () => {
  const { users, isLoading, error, fetchAllUsers, updateUserByAdmin } = useUserStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleRoleChange = useCallback(
    async (uid: string, newRole: UserRole) => {
      const promise = updateUserByAdmin(uid, { role: newRole });
      
      toast.promise(promise, {
        loading: 'Actualizando rol...',
        success: 'Rol actualizado con éxito.',
        error: 'No se pudo actualizar el rol.',
      });

      return promise;
    },
    [updateUserByAdmin]
  );

  const handleToggleDisabled = useCallback(
    async (uid: string, currentStatus: boolean) => {
      const newStatus = !currentStatus;
      const promise = updateUserByAdmin(uid, { is_disabled: newStatus });

      toast.promise(promise, {
        loading: newStatus ? 'Deshabilitando usuario...' : 'Habilitando usuario...',
        success: newStatus 
          ? 'Usuario deshabilitado correctamente.' 
          : 'Usuario habilitado correctamente.',
        error: 'No se pudo actualizar el estado del usuario.',
      });

      return promise;
    },
    [updateUserByAdmin]
  );

  return {
    users,
    isLoading,
    error,
    handleRoleChange,
    handleToggleDisabled,
  };
};